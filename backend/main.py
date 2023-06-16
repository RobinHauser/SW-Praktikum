import json

from flask import Flask, request
from flask_cors import CORS
from flask_restx import Resource, Api, Namespace, fields

from backend.SecurityDecorator import secured
from backend.src.server.Administration import Administration

app = Flask(__name__)

CORS(app, resources=r'/*')

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
personal_profile_namespace = Namespace(name="personal-profile", description="This is the Profile")
search_profile_namespace = Namespace(name="search-profile", description="This is the Search Profile")
view_namespace = Namespace(name="view", description="tbd")
init_user_namespace = Namespace(name="init-user", description="tbd")

# Adding the namespaces to the api
api.add_namespace(bookmarklist_namespace)
api.add_namespace(blocklist_namespace)
api.add_namespace(chat_namespace)
api.add_namespace(message_namespace)
api.add_namespace(personal_profile_namespace)
api.add_namespace(search_profile_namespace)
api.add_namespace(view_namespace)
api.add_namespace(init_user_namespace)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='This is the unique identifier of an business-object ')
})

user = api.inherit('User', {
    'UserID': fields.String(attribute=lambda x: x.get_user_id(), description='This is the id of the user'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='This is the email of the user'),
    'displayname': fields.String(attribute=lambda x: x.get_displayname(), description='This is the full name of the user'),
    'ProfileIMGURL': fields.String(attribute=lambda x: x.get_avatarurl(), description='This is the URL to the profileImage of the profile'),
})

message = api.inherit('Message', bo, {
    'timestamp': fields.Date(attribute='timestamp', description='This is the timestamp at which the message was sent'),
    'content': fields.String(attribute='content', description='This is the content of the message which was sent'),
    'sender': fields.Nested(user),
    'receiver': fields.Nested(user)
})

information = api.inherit('Information', bo, {
    'profile_id': fields.String(attribute='', description='This is the information of a property')
})

property = api.inherit('Property', bo, {
    'Information1': fields.Nested(information)
})

bookmarklist = api.inherit('Bookmarklist', {
    'user': fields.Nested(user)
})

blocklist = api.inherit('Blocklist', {
    'user': fields.Nested(user)
})


profile = api.inherit('Profile', bo, {
    'user_id': fields.Integer(attribute=lambda x: x.get_user_id(), description='This is the unique identifier of a profiles user '),
    'is_personal': fields.Boolean(attribute=lambda x: x.get_is_personal(), description='This is the unique identifier of a bool ')
})


@bookmarklist_namespace.route('/<int:user_id>')
@bookmarklist_namespace.response(500, 'TBD')
@bookmarklist_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@bookmarklist_namespace.response(200, 'TBD')
class Bookmarklist_api(Resource):

    # @secured
    def get(self, user_id):
        """
        Getting the bookmark list of a specific user
        :param user_id: the id of the user we want the bookmarklist from
        :return: Returning a list of all bookmarked users. If there is no bookmarked user it will return an empty list.
        """
        adm = Administration()
        response = adm.get_bookmarklist_by_user_id(user_id)
        return response

    @secured
    def post(self, user_id):
        """
        Adding a new user to the users bookmarklist
        :param user_id: the id of the user we want to add another user to his bookmarklist
        :return: the user that was added to the bookmarklist
        """
        adm = Administration()
        response = adm.add_user_to_bookmarklist(user_id, api.payload)
        return response

    # @secured
    def delete(self, user_id):
        """
        Removing a user from the users bookmarklist
        :param user_id: the id of the user we want to remove a user from his bookmarklist
        :return: the user that was removed to the bookmarklist
        """
        adm = Administration()
        response = adm.remove_user_from_bookmarklist(user_id, api.payload)
        return response


@blocklist_namespace.route('/<int:user_id>')
@blocklist_namespace.response(500, 'TBD')
@blocklist_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@blocklist_namespace.response(200, 'TBD')
class Blocklist_api(Resource):
    # @secured
    def get(self, user_id):
        """
        Getting list of all blocked users of a user
        :param user_id: the id of the user we want the blocklist from
        :return: Returning a list of all blocked users. If there is no blocked user it will return an empty list.
        """
        adm = Administration()
        response = adm.get_blocklist_by_user_id(user_id)
        return response

    # @secured
    def post(self, user_id):
        """
        Adding a new user to the users blocklist
        :param user_id: the id of the user we want to add another user to his blocklist
        :return: the user that was added to the blocklist
        """
        adm = Administration()
        response = adm.add_user_to_blocklist(user_id, api.payload)
        return response

    # @secured
    def delete(self, user_id):
        """
        Removing a user from the users blocklist
        :param user_id: the id of the user we want to remove a user from his blocklist
        :return: the user that was removed from the blocklist
        """
        adm = Administration()
        response = adm.delete_blocklist(user_id, json.loads(request.data))
        return response


@view_namespace.route('/<int:user_id>')
class View_api(Resource):
    # @secured
    def get(self, user_id):
        """
        get a list of users the given user has been seen
        :param user_id: the id of the user we want to get the viewed list of
        :return: return a list of all users the user hass been seen
        """
        adm = Administration()
        response = adm.get_viewed_list_by_user_id(user_id)
        return response

    # @secured
    def post(self, user_id):
        """
        Add a new user to the viewed list
        :param user_id: the id of the user we want to add another user to his viewed list
        :return: the added user
        """
        adm = Administration()
        response = adm.add_user_to_viewedList(user_id, api.payload)
        return response

    # @secured
    def delete(self, user_id):
        """
        Remove a user from a viewed list
        :param user_id: the id of the user we want to remove another user to his viewed list
        :return: the removed user
        """
        adm = Administration()
        response = adm.remove_user_to_viewedList(user_id, api.payload)
        return response


@chat_namespace.route('/<int:user_id>')
class Chat_api(Resource):
    def get(self, user_id):
        adm = Administration()

        response = adm.get_chat_by_user_id(user_id)

        return response

    def post(self, user_id):
        adm = Administration()
        response = adm.add_chat_to_user(user_id, api.payload)

        return response

    def delete(self):
        pass


@message_namespace.route('/<int:id>')
class Message_api(Resource):
    def get(self, id):  # Chat ID

        adm = Administration()
        response = adm.get_messages_by_chat_id(id)
        return response

    def post(self, id):  # User ID

        adm = Administration()
        response = adm.add_message_to_chat(id, api.payload)
        return response


@personal_profile_namespace.route('/personal_profiles')
class PersonalProfileList_api(Resource):
    @personal_profile_namespace.marshal_list_with(profile)
    def get(self):
        adm = Administration()
        response = adm.get_all_personal_profiles()
        return response

@personal_profile_namespace.route('/<int:id>')
class PersonalProfile_api(Resource):
    @personal_profile_namespace.marshal_with(profile)
    def get(self, id):
        """
        Gets the profile with the given ID
        :param id: ID of the profile
        :return: profile with the given ID
        """
        adm = Administration()
        response = adm.get_profile_by_id(id)
        return response

    @personal_profile_namespace.marshal_with(profile)
    def post(self, id):
        """
        Creates a personal profile for a user specified by the given id
        :param id: id of the user we create a personal profile for
        :return: created profile
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        response = adm.create_personal_profile_for_user(user)
        return response

    @personal_profile_namespace.marshal_with(profile)
    def delete(self, id):
        """
        Deletes profile with the given id
        :param id: id of the profile we want to delete
        :return: deleted profile
        """
        adm = Administration()
        prof = adm.get_profile_by_id(id)
        response = adm.delete_profile(prof)
        return response

@personal_profile_namespace.route('/personal/<int:id>')
class PersonalProfileByUser_api(Resource):
    @personal_profile_namespace.marshal_with(profile)
    def get(self, id):
        """
        gets the personal profile of the given user id
        :param id: id of the user we want to get the personal profile from
        :return: personal profile of user
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        response = adm.get_personal_profile_of_user(user)
        return response

@search_profile_namespace.route('/search/<int:id>')
class SearchProfilesByUser_api(Resource):
    @search_profile_namespace.marshal_list_with(profile)
    def get(self, id):
        adm = Administration()
        user = adm.get_user_by_id(id)
        response = adm.get_search_profiles_of_user(user)
        return response

@search_profile_namespace.route('/<int:id>')
class SearchProfile_api(Resource):
    @search_profile_namespace.marshal_with(profile)
    def get(self, id):
        """
        Gets the (search) profile with the given ID
        :param id: ID of the (search) profile
        :return: (search) profile with the given ID
        """
        adm = Administration()
        response = adm.get_profile_by_id(id)
        return response

    @search_profile_namespace.marshal_with(profile)
    def post(self, id):
        """
        Add a new search profile for a user
        :param id: id of the user we want to add a new searchProfile for
        :return: the added search profile
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        response = adm.create_search_profile_for_user(user)
        return response

    @search_profile_namespace.marshal_with(profile)
    def delete(self, id):
        """
        Deletes (search) profile with the given id
        :param id: id of the (search) profile we want to delete
        :return: deleted (search) profile
        """
        adm = Administration()
        prof = adm.get_profile_by_id(id)
        response = adm.delete_profile(prof)
        return response




@init_user_namespace.route('/<string:email>')
class Init_user_api(Resource):
    @init_user_namespace.marshal_with(user, code=200)
    def get(self, email):
        """
        Get the user_id of the given email
        :param email: the email, we want the user_id from
        :return: the user of the email
        """
        adm = Administration()
        return adm.get_user_by_email(email)


if __name__ == '__main__':
    app.run(port=8000, debug=True)

