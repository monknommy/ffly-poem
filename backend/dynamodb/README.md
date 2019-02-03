# Dynamodb
This project prepare the database. fill_poem_meta.py will read from sqlite db poem.db and upload to dynamodb. 

## Setup
To see poem.db, install [Git Large File Storage](https://git-lfs.github.com/) then run:
```
git lfs pull
```

Deploy DB Schema to AWS:
```
serverless deploy
```

Populate database:

```
python fill_poem_meta.py
```


## DB Design
Gaph like design. Details TBD.



