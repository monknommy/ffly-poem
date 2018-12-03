import boto3
from peewee import *
from playhouse.sqlite_ext import SqliteExtDatabase

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
            'id1': dynamodb_id,
            'id2': dynamodb_id,
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
            'id1': dynamodb_id,
            'id2': dynamodb_id,
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
def parse_all():
    sqlite_db.connect()
    for poem in Poem.select():
        poems[poem.id] = poem
        if poem.author_id not in authors:
            author = Author.get(Author.id== poem.author_id)
            authors[poem.author_id] = author
    

def fill():
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('test_ffly_poem_2')
    with table.batch_writer() as batch:
        for poem in poems.values():
            batch.put_item(Item=poem.get_dynamodb_node())
        for author in authors.values():
            batch.put_item(Item=author.get_dynamodb_node())

def print_data():
    for author in authors.values():
        print(author.get_dynamodb_node())

    for poem in poems.values():
        print(poem.get_dynamodb_node())

parse_all()
#print_data()
fill()
