from config import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(1000), unique = True, nullable = True )
    description = db.Column(db.String(1000), unique = False, nullable = True)

    def to_json(self):
        return{
            "id": self.id,
            "heading": self.title,
            "items": self.description,
        }

