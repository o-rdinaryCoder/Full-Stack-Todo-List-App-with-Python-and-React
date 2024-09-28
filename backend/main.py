from flask import request, jsonify
from config import app, db
from models import Todo

@app.route("/todoLists", methods=["GET"])
def get_todoLists():
    todoLists = Todo.query.all()
    json_todoLists = list(map(lambda x: x.to_json(), todoLists))
    return jsonify({"todoLists": json_todoLists})


@app.route("/createList", methods=["POST"])
def create_list():
    title = request.json.get("heading")
    description = request.json.get("items")

    if not title or not description:
        return(
            jsonify({"message": "You must include either title or description"}), 400
        )
    

    new_list = Todo(title = title, description = description)
    try:
        db.session.add(new_list)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Success! list created!"}), 201


@app.route("/updateList/<int:list_id>", methods=["PATCH"])
def updateList(list_id):
    todoLists = Todo.query.get(list_id)
    if not todoLists:
        return jsonify({"message": "List not found"}), 404
    
    data = request.json
    todoLists.title = data.get("heading", todoLists.title)
    todoLists.description = data.get("items", todoLists.description)

    db.session.commit()
    
    return jsonify({"message": "List updated!"}), 200

@app.route("/deleteList/<int:list_id>", methods=["DELETE"])

def deleteList(list_id):
    todoLists = Todo.query.get(list_id)

    if not todoLists:
        return jsonify({"message": "List not found"}), 404
    
    db.session.delete(todoLists)
    db.session.commit()

    return jsonify({"message": "List has been successfully deleted"}), 200

if  __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)


