import boto3
from peewee import *
from playhouse.sqlite_ext import SqliteExtDatabase
import os

sqlite_db = SqliteExtDatabase('poem.db')
class BaseModel(Model):
    class Meta:
        database = sqlite_db
        
class Author(BaseModel):
    id = TextField()
    name = TextField()
    dynasty = TextField()
    about = TextField()
    dynamodb_author_id = None

    def get_dynamodb_node(self):
        dynamodb_id = 'AUTHOR_' + self.id
        result = {
            'id': dynamodb_id,
            'edge': "SELF",
        }
        if self.name is not None and len(self.name) > 0:
            result['name'] = self.name
        if self.dynasty is not None and len(self.dynasty) > 0:
            result['dynasty'] = self.dynasty
        if self.about is not None and len(self.about) > 0:
            result['about'] = self.about
        return result
    
class Poem(BaseModel):
    id = TextField()
    content = TextField()
    author_id = TextField()
    genre = TextField()
    annotation = TextField()
    name = TextField()

    def get_dynamodb_node(self):
        dynamodb_id = 'POEM_' + self.id
        result = {
            'id': dynamodb_id,
            'edge': "SELF",
        }
        if self.content is not None and len(self.content) > 0:
            result['content'] = self.content
        if self.genre is not None and len(self.genre) > 0:
            result['genre'] = self.genre
        if self.annotation is not None and len(self.annotation) > 0:
            result['annotation'] = self.annotation
        if self.name is not None and len(self.name) > 0:
            result['name'] = self.name

        return result

authors = {}
poems = {}
author_in_poems = {}

def get_author_in_poem(poem, author):
  return {
    'id': "POEM_" + poem.id,
    'edge': "AUTHOR:AUTHOR_" + poem.author_id
  }

def parse_all():
    sqlite_db.connect()
    for poem in Poem.select():
        poems[poem.id] = poem
        if poem.author_id not in authors:
            author = Author.get(Author.id == poem.author_id)
            authors[poem.author_id] = author
        author_in_poems[poem.id] = get_author_in_poem(poem, authors[poem.author_id])
    

def fill():
    db_name = os.environ['AWS_DYNAMODB_META_TABLE']
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['FFLY_AWS_REGION'])
    table = dynamodb.Table(db_name)
    with table.batch_writer() as batch:
        for poem in poems.values():
            batch.put_item(Item=poem.get_dynamodb_node())
        for author in authors.values():
            batch.put_item(Item=author.get_dynamodb_node())
        for author_in_poem in author_in_poems.values():
            batch.put_item(Item=author_in_poem)

def print_data():
    for author in authors.values():
        print(author.get_dynamodb_node())

    for poem in poems.values():
        print(poem.get_dynamodb_node())

parse_all()
#print_data()
fill()
