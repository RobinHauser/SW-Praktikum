from flask import Flask, request

from flask_restx import Api, Resource, fields, Namespace

from server.Administration import Administration

app = Flask(__name__)

api = Api(app,
          version='1.0',
          title='Sopra-Dating API',
          description='This is the API for the sopra dating-app',
          doc='/swagger-ui')

# Creating the namespaces
bookmarklist_namespace = Namespace(name="bookmarklist", description="This is the Bookmarklist")
blocklist_namespace = Namespace(name="blocklist", description="This is the Blockmarklist")
chat_namespace = Namespace(name="chat", description="This is the Chat")
message_namespace = Namespace(name="message", description="This is the Message")
profile_namespace = Namespace(name="profile", description="This is the Profile")
search_profile_namespace = Namespace(name="search-profile", description="This is the Search Profile")

# Adding the namespaces to the api
api.add_namespace(bookmarklist_namespace)
api.add_namespace(blocklist_namespace)
api.add_namespace(chat_namespace)
api.add_namespace(message_namespace)
api.add_namespace(profile_namespace)
api.add_namespace(search_profile_namespace)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='This is the unique identifier of an business-object ')
})

user = api.inherit('User', bo, {
    'firstname': fields.String(attribute='firstname', description='This is the firstname of the user '),
    'lastname': fields.String(attribute='lastname', description='This is the lastname of the user '),
    'email': fields.String(attribute='email', description='This is the email of the user '),
    'birthdate': fields.Date(attribute='birth_date', description='This is the birthday of the user '),
    'google_id': fields.String(attribute='gender', description='This is the google id of the user '),
})

message = api.inherit('Message', bo, {
    'timestamp': fields.Date(attribute='timestamp', description='This is the timestamp at which the message was sent'),
    'content': fields.String(attribute='content', description='This is the content of the message which was sent'),
    'sender': fields.Nested(user),
    'receiver': fields.Nested(user)
})

information = api.inherit('Information', bo, {
    'Haircolor': fields.String(attribute='information', description='This is the information of a property')
})

property = api.inherit('Property', bo, {
    'Information1': fields.Nested(information)
})


@bookmarklist_namespace.route('/<int:user_id>')
class Bookmarklist_api(Resource):

    @api.marshal_list_with(user)
    def get(self, user_id):
        adm = Administration()
        response = adm.get_bookmarklist_by_user_id(user_id)
        return response

    def post(self):
        adm = Administration()
        response = adm.create_bookmarklist(user_id)
        return response

    def delete(self):
        @app.route('/bookmarklist')
        def data():
            # here we want to get the value of bookmarklist (i.e. ?user=some-value)
            bookmarklist_id = request.args.get('bookmarklist-id')

        adm = Administration()
        response = adm.delete_bookmarklist(bookmarklist_id)
        return response


@blocklist_namespace.route()
class Blocklist_api(Resource):
    @api.marshal_list_with(user)
    def get(self):
        adm = Administration()
        response = adm.get_blocklist_by_user_id(user_id)
        return response

    def post(self):
        adm = Administration()
        response = adm.create_blocklist_for_user(user_id)
        return response

    def delete(self):
        adm = Administration()
        response = adm.delete_blocklist(blocklist_id)
        return response


@chat_namespace.route()
class Chat_api(Resource):
    def get(self):
        adm = Administration()
        response = adm.get_chat_by_user_id(user_id)
        return response

    def post(self):
        pass

    def delete(self):
        pass


@message_namespace.route()
class Message_api(Resource):
    def get(self):
        pass

    def post(self):
        pass


@profile_namespace.route()
class Profile_api(Resource):
    def get(self):
        adm = Administration()
        response = adm.get_profile_by_user_id()
        return response

    def put(self):
        pass


@search_profile_namespace.route()
class Search_profile_api(Resource):
    def get(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass

    def post(self):
        pass


if __name__ == '__main__':
    app.run()
