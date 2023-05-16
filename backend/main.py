from flask import Flask, request

from flask_restx import Api, Resource, Namespace, fields


app = Flask(__name__)

api = Api(app,
          version='1.0',
          title='Sopra-Dating API',
          description='This is the API for the sopra dating-app',
          doc='/swagger-ui')

__pre_url = "/api/v1/"

# Creating the namespaces
bookmarklist_namespace = Namespace(name="Bookmarklist", description="This is the Bookmarklist")
blocklist_namespace = Namespace(name="Blocklist", description="This is the Blockmarklist")
chat_namespace = Namespace(name="Chat", description="This is the Chat")
message_namespace = Namespace(name="Message", description="This is the Message")
profile_namespace = Namespace(name="Profile", description="This is the Profile")
search_profile_namespace = Namespace(name="Search Profile", description="This is the Search Profile")

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


@bookmarklist_namespace.route(__pre_url + 'bookmarklist')
class Bookmarklist_api(Resource):
    @api.marshal_list_with(message)
    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass


@blocklist_namespace.route(__pre_url + 'blocklist')
class Blocklist_api(Resource):
    @api.marshal_list_with(user)

    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass


@chat_namespace.route(__pre_url + 'chat')
class Chat_api(Resource):
    def get(self):
        pass

    def post(self):
        pass

    def delete(self):
        pass


@message_namespace.route(__pre_url + 'message')
class Message_api(Resource):
    def get(self):
        pass

    def post(self):
        pass


@profile_namespace.route(__pre_url + 'profile')
class Profile_api(Resource):
    def get(self):
        pass

    def put(self):
        pass


@search_profile_namespace.route(__pre_url + 'search-profile')
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
