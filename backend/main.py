import json

from flask import Flask, request
from flask_cors import CORS
from flask_restx import Resource, Api, Namespace, fields

from SecurityDecorator import secured
from src.server.Administration import Administration

from src.server.bo.SelectionProperty import SelectionProperty
from src.server.bo.TextProperty import TextProperty
from src.server.bo.Profile import Profile
from src.server.bo.User import User

app = Flask(__name__)

# Allowing all resources to have access.
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
view_namespace = Namespace(name="view", description="This is the Viewedlist")
init_user_namespace = Namespace(name="init-user", description="This if for the init user")
selection_property_namespace = Namespace(name="selection-property", description="This is the selection property")
text_property_namespace = Namespace(name="text-property", description="This is the text property")
information_namespace = Namespace(name="information", description="This is the information")
user_namespace = Namespace(name="user", description="This is the user")
all_user_namespace = Namespace(name="all-user", description="Getting all users")

# Adding the namespaces to the api
api.add_namespace(bookmarklist_namespace)
api.add_namespace(blocklist_namespace)
api.add_namespace(chat_namespace)
api.add_namespace(message_namespace)
api.add_namespace(personal_profile_namespace)
api.add_namespace(search_profile_namespace)
api.add_namespace(view_namespace)
api.add_namespace(init_user_namespace)
api.add_namespace(selection_property_namespace)
api.add_namespace(text_property_namespace)
api.add_namespace(information_namespace)
api.add_namespace(user_namespace)
api.add_namespace(all_user_namespace)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='This is the unique identifier of an business-object ')
})

user = api.inherit('User', {
    'UserID': fields.String(attribute=lambda x: x.get_user_id(), description='This is the id of the user'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='This is the email of the user'),
    'displayname': fields.String(attribute=lambda x: x.get_displayname(),
                                 description='This is the full name of the user'),
    'ProfileIMGURL': fields.String(attribute=lambda x: x.get_avatarurl(),
                                   description='This is the URL to the profileImage of the profile'),
})

message = api.inherit('Message', bo, {
    'timestamp': fields.Date(attribute='timestamp', description='This is the timestamp at which the message was sent'),
    'content': fields.String(attribute='content', description='This is the content of the message which was sent'),
    'sender': fields.Nested(user),
    'receiver': fields.Nested(user)
})

information = api.inherit('Information', bo, {
    'profileID': fields.Integer(attribute=lambda x: x.get_profile_id(),
                                description='This is the profile ID of an information'),
    'valueID': fields.Integer(attribute=lambda x: x.get_value_id(), description='This is the ValueID of an information')
})

bookmarklist = api.inherit('Bookmarklist', {
    'user': fields.Nested(user)
})

blocklist = api.inherit('Blocklist', {
    'user': fields.Nested(user)
})

profile = api.inherit('Profile', bo, {
    'UserID': fields.Integer(attribute=lambda x: x.get_user_id(),
                             description='This is the unique identifier of a profiles user '),
    'isPersonal': fields.Boolean(attribute=lambda x: x.get_is_personal(),
                                 description='This is the unique identifier of a bool ')
})

property = api.inherit('Property', bo, {
    'name': fields.String(attribute=lambda x: x.get_name(),
                          description='This is the unique identifier of a property name'),
    'isSelection': fields.Boolean(attribute=lambda x: x.get_is_selection(),
                                  description='This is the unique identifier of a property type'),
    'description': fields.String(attribute=lambda x: x.get_description(),
                                 description='This is the unique identifier of a property description')
})

selection_property = api.inherit('SelectionProperty', bo, property, {
    # 'selections': fields.List(fields.String, attribute=lambda x: x.get_selections(), description='This is the unique identifier of a selection property list')
})

text_property = api.inherit('TextProperty', bo, property, {

})

profile_similarity = {
    'profile': fields.Nested(profile),
    'similarity': fields.Float
}

"""
--------------------------------------------------------------------------------------------------------------
Bookmarklist
--------------------------------------------------------------------------------------------------------------
"""
@bookmarklist_namespace.route('/<int:user_id>')
@bookmarklist_namespace.response(500, 'TBD')
@bookmarklist_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@bookmarklist_namespace.response(200, 'TBD')
class Bookmarklist_api(Resource):

    @secured
    @bookmarklist_namespace.marshal_list_with(user)
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
    @bookmarklist_namespace.marshal_with(user)
    def post(self, user_id):
        """
        Adding a new user to the users bookmarklist
        :param user_id: the id of the user we want to add another user to his bookmarklist
        :return: the user that was added to the bookmarklist
        """
        adm = Administration()
        bookmarked_user = User.from_dict(api.payload)
        response = adm.add_user_to_bookmarklist(user_id, bookmarked_user)
        return response

    @secured
    @bookmarklist_namespace.marshal_with(user)
    def delete(self, user_id):
        """
        Removing a user from the users bookmarklist
        :param user_id: the id of the user whose bookmarklist we want to remove a user from
        :return: the user that was removed from the bookmarklist
        """
        adm = Administration()
        bookmarked_user = User.from_dict(api.payload)
        response = adm.remove_user_from_bookmarklist(user_id, bookmarked_user)
        return response

"""
--------------------------------------------------------------------------------------------------------------
Blocklist
--------------------------------------------------------------------------------------------------------------
"""

@blocklist_namespace.route('/<int:user_id>')
@blocklist_namespace.response(500, 'TBD')
@blocklist_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@blocklist_namespace.response(200, 'TBD')
class Blocklist_api(Resource):
    @secured
    @blocklist_namespace.marshal_list_with(user)
    def get(self, user_id):
        """
        Getting list of all blocked users of a user
        :param user_id: the id of the user we want the blocklist from
        :return: Returning a list of all blocked users. If there is no blocked user it will return an empty list.
        """
        adm = Administration()
        response = adm.get_blocklist_by_user_id(user_id)
        return response

    @secured
    @blocklist_namespace.marshal_with(user)
    def post(self, user_id):
        """
        Adding a new user to the users blocklist
        :param user_id: the id of the user to whose blocklist we add another user to (from payload)
        :return: the user that was added to the blocklist
        """
        adm = Administration()
        new_user = User.from_dict(api.payload)
        response = adm.add_user_to_blocklist(user_id, new_user)
        return response

    @secured
    @blocklist_namespace.marshal_with(user)
    def delete(self, user_id):
        """
        Removing a user from the users blocklist
        :param user_id: the id of the user whose blocklist we want to remove a user from
        :return: the user that was removed from the blocklist
        """
        adm = Administration()
        blocked_user = User.from_dict(api.payload)
        response = adm.remove_user_from_blocklist(user_id, blocked_user)
        return response

"""
--------------------------------------------------------------------------------------------------------------
View
--------------------------------------------------------------------------------------------------------------
"""

@view_namespace.response(500, 'Something bad happened in the backend.')
@view_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@view_namespace.response(200, 'The request was ok')
@view_namespace.route('/<int:id>')
class View_api(Resource):
    @secured
    @view_namespace.marshal_list_with(user)
    def get(self, id):
        """
        get a list of users the given user has been seen
        :param user_id: the id of the user we want to get the viewed list of
        :return: return a list of all users the user hass been seen
        """
        adm = Administration()
        response = adm.get_viewed_list_by_user_id(id)
        return response

    @secured
    def post(self, id):
        """
        Add a new user to the viewed list
        :param user_id: the id of the user we want to add another user to his viewed list
        :return: the added user
        """
        adm = Administration()
        response = adm.add_user_to_viewedList(id, api.payload)
        return response

    @secured
    def delete(self, user_id):
        """
        Remove a user from a viewed list
        :param user_id: the id of the user we want to remove another user to his viewed list
        :return: the removed user
        """
        adm = Administration()
        response = adm.remove_user_to_viewedList(user_id, api.payload)
        return response


"""
--------------------------------------------------------------------------------------------------------------
Chat
--------------------------------------------------------------------------------------------------------------
"""

@chat_namespace.route('/<int:user_id>')
class Chat_api(Resource):
    @secured
    def get(self, user_id):
        """
        Get the chat associated to a user
        :param user_id: the id of the user we want to get the chats from
        :return: chats associated to the user
        """
        adm = Administration()
        response = adm.get_chat_by_user_id(user_id)
        return response

    @secured
    def post(self, user_id):
        """
        Start a new chat with a user
        :param user_id: id of the user which starts the chat
        :return:
        """
        adm = Administration()
        response = adm.add_chat_to_user(user_id, api.payload)
        return response

    @secured
    def delete(self):
        pass

"""
--------------------------------------------------------------------------------------------------------------
Message
--------------------------------------------------------------------------------------------------------------
"""

@message_namespace.route('/<int:id>')
@message_namespace.response(500, 'Something bad happend in the backend.')
@message_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@message_namespace.response(200, 'The request was ok')
class Message_api(Resource):
    @secured
    def get(self, id):  # Chat ID
        """
        Get all messages associated to a chat
        :param id: chat_id of the chat we want to get the messages from
        :return: all messages associated to the chat
        """
        adm = Administration()
        response = adm.get_messages_by_chat_id(id)
        return response

    @secured
    def post(self, id):  # User ID
        """
        Add a new message to a chat
        :param id: user_id which sends the message
        :return:
        """
        adm = Administration()
        response = adm.add_message_to_chat(id, api.payload)
        return response


"""
--------------------------------------------------------------------------------------------------------------
Personal Profile
--------------------------------------------------------------------------------------------------------------
"""

@personal_profile_namespace.route('/personal_profiles')
@personal_profile_namespace.response(500, 'Something bad happend in the backend.')
@personal_profile_namespace.response(401,
                                     'The user is unauthorized to perform this request. Set a valid token to go on.')
@personal_profile_namespace.response(200, 'The request was ok')
class PersonalProfileList_api(Resource):
    @secured
    @personal_profile_namespace.marshal_list_with(profile)
    def get(self):
        """
        gets a list with all personal profiles
        :return: a list with all personal profiles
        """
        adm = Administration()
        response = adm.get_all_personal_profiles()
        return response


@personal_profile_namespace.route('/sorted/<int:id>')
@personal_profile_namespace.response(500, 'Something bad happend in the backend.')
@personal_profile_namespace.response(401,
                                     'The user is unauthorized to perform this request. Set a valid token to go on.')
@personal_profile_namespace.response(200, 'The request was ok')
class PersonalProfileSimilarity_api(Resource):
    @secured
    @personal_profile_namespace.marshal_list_with(user)
    def get(self, id):
        """
        gets a list of all personal profiles sorted by similarity.
        :param id: id of the search profile we want to base the similarity on
        :return: list of all personal profiles sorted by similarity to the given search profile
        """
        adm = Administration()
        search = adm.get_profile_by_id(id)
        if search is not None:
            response = adm.get_sorted_list_of_personal_profiles(search)
            return response
        else:
            return '', 500


@personal_profile_namespace.route('/<int:id>')
@personal_profile_namespace.response(500, 'Something bad happend in the backend.')
@personal_profile_namespace.response(401,
                                     'The user is unauthorized to perform this request. Set a valid token to go on.')
@personal_profile_namespace.response(200, 'The request was ok')
class PersonalProfile_api(Resource):
    @secured
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

    @secured
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


@personal_profile_namespace.route('/by_user/<int:id>')
@personal_profile_namespace.response(500, 'Something bad happend in the backend.')
@personal_profile_namespace.response(401,
                                     'The user is unauthorized to perform this request. Set a valid token to go on.')
@personal_profile_namespace.response(200, 'The request was ok')
class PersonalProfileByUser_api(Resource):
    @secured
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

    @secured
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


"""
--------------------------------------------------------------------------------------------------------------
Search Profile
--------------------------------------------------------------------------------------------------------------
"""

@search_profile_namespace.route('/by_user/<int:id>')
@search_profile_namespace.response(500, 'Something bad happend in the backend.')
@search_profile_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@search_profile_namespace.response(200, 'The request was ok')
class SearchProfilesByUser_api(Resource):
    @secured
    @search_profile_namespace.marshal_list_with(profile)
    def get(self, id):
        """
        gets a list of all search profiles of a user
        :param id: id of the user
        :return: search profiles of the user
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        response = adm.get_search_profiles_of_user(user)
        return response

    @secured
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


@search_profile_namespace.route('/<int:id>')
@search_profile_namespace.response(500, 'Something bad happend in the backend.')
@search_profile_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@search_profile_namespace.response(200, 'The request was ok')
class SearchProfile_api(Resource):
    @secured
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

    @secured
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


"""
--------------------------------------------------------------------------------------------------------------
Selection Property
--------------------------------------------------------------------------------------------------------------
"""

@selection_property_namespace.route('/<int:id>')
@selection_property_namespace.response(500, 'Something bad happend in the backend.')
@selection_property_namespace.response(401,
                                       'The user is unauthorized to perform this request. Set a valid token to go on.')
@selection_property_namespace.response(200, 'The request was ok')
class SelectionProperty_api(Resource):
    @secured
    @selection_property_namespace.marshal_with(selection_property)
    def get(self, id):
        """
        Gets the selection property with the given ID
        :param id: ID of the wanted selection property
        :return: the selection property object of the given ID
        """
        adm = Administration()
        response = adm.get_selection_property_by_id(id)
        return response

    @secured
    @selection_property_namespace.marshal_with(selection_property)
    def put(self, id):
        """
        updates the selection property with the given ID
        :param id: ID of the selection property we want to update
        :return: the updated selection property
        """
        adm = Administration()

        sel_prop = SelectionProperty.from_dict(api.payload)

        if sel_prop is not None:
            sel_prop.set_id(id)
            response = adm.update_selection_property(sel_prop)
            return response, 200
        else:
            return '', 500

    @secured
    @selection_property_namespace.marshal_with(selection_property)
    def delete(self, id):
        """
        deletes the selection property with the given ID
        :param id: ID of the selection property we want to delete
        :return: deleted selection property
        """
        adm = Administration()
        sel_prop = adm.get_selection_property_by_id(id)
        response = adm.delete_selection_property(sel_prop)
        return response


@selection_property_namespace.route('/selection_properties')
@selection_property_namespace.response(500, 'Something bad happend in the backend.')
@selection_property_namespace.response(401,
                                       'The user is unauthorized to perform this request. Set a valid token to go on.')
@selection_property_namespace.response(200, 'The request was ok')
class SelectionPropertyList_api(Resource):
    @secured
    @selection_property_namespace.marshal_with(selection_property)
    def post(self):
        """
        creates a new selection property
        :return: created selection property
        """
        adm = Administration()

        proposal = SelectionProperty.from_dict(api.payload)

        if proposal is not None:
            name = proposal.get_name()
            # is_selection = proposal.get_is_selection()
            description = proposal.get_description()
            result = adm.create_selection_property(name, description)
            return result, 200
        else:
            return '', 500

    @secured
    @selection_property_namespace.marshal_list_with(selection_property)
    def get(self):
        """
        returns a list of all selection properties
        :return: a list of all selection properties
        """
        adm = Administration()
        response = adm.get_all_selection_properties()
        return response


@selection_property_namespace.route('/options/<int:id>')
@selection_property_namespace.response(500, 'Something bad happend in the backend.')
@selection_property_namespace.response(401,
                                       'The user is unauthorized to perform this request. Set a valid token to go on.')
@selection_property_namespace.response(200, 'The request was ok')
class SelectionPropertyOptions_api(Resource):
    @secured
    def get(self, id):
        """
        gets the selectable options of a selection property
        :param id: id of the selection property
        :return: selectable options (Values) with respective ValueIDs
        """
        adm = Administration()
        sel_prop = adm.get_selection_property_by_id(id)
        response = adm.retrieve_options(sel_prop)
        return response

    @secured
    def post(self, id):
        """
        adds a selectable option to the given selection property
        :param id: id of the selection property
        :return: the added selectable option
        """
        adm = Administration()
        sel_prop = adm.get_selection_property_by_id(id)
        response = adm.add_option(sel_prop, api.payload)
        return response

    @secured
    def delete(self, id):
        """
        deletes the given selectable option
        :param id: id of the selectable option (ValueID)
        :return: -
        """
        adm = Administration()
        adm.remove_option(id)
        return ''

    @secured
    def put(self, id):
        """
        updates the name of a selectable option of a selection property
        :param id: id of the selectable option (ValueID)
        :return: updated option name as json
        """
        adm = Administration()
        response = adm.update_option(id, api.payload)
        return response


"""
--------------------------------------------------------------------------------------------------------------
Text Property
--------------------------------------------------------------------------------------------------------------
"""

@text_property_namespace.route('/<int:id>')
@text_property_namespace.response(500, 'Something bad happend in the backend.')
@text_property_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@text_property_namespace.response(200, 'The request was ok')
class TextProperty_api(Resource):
    @secured
    @text_property_namespace.marshal_with(text_property)
    def get(self, id):
        """
        gets a text property by its id
        :param id: id of the wanted text property
        :return: text property
        """
        adm = Administration()
        response = adm.get_text_property_by_id(id)
        return response

    @secured
    @text_property_namespace.marshal_with(text_property)
    def put(self, id):
        """
        updates the text property of the given id
        :param id: id of the text property we want to update
        :return: updated text property
        """
        adm = Administration()

        text_prop = TextProperty.from_dict(api.payload)

        if text_prop is not None:
            text_prop.set_id(id)
            response = adm.update_text_property(text_prop)
            return response, 200
        else:
            return '', 500

    @secured
    @text_property_namespace.marshal_with(text_property)
    def delete(self, id):
        """
        deletes the text property of the given id
        :param id: id of the text property we want to update
        :return: deleted text property
        """
        adm = Administration()
        text_prop = adm.get_text_property_by_id(id)
        response = adm.delete_text_property(text_prop)
        return response


@text_property_namespace.route('/text_properties')
@text_property_namespace.response(500, 'Something bad happend in the backend.')
@text_property_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@text_property_namespace.response(200, 'The request was ok')
class TextPropertyList_api(Resource):
    @secured
    @text_property_namespace.marshal_with(text_property)
    def post(self):
        """
        creates a new text property
        :return: the created text property
        """
        adm = Administration()

        proposal = TextProperty.from_dict(api.payload)

        if proposal is not None:
            name = proposal.get_name()
            # is_selection = proposal.get_is_selection()
            description = proposal.get_description()
            result = adm.create_text_property(name, description)
            return result, 200
        else:
            return '', 500

    @secured
    @text_property_namespace.marshal_list_with(text_property)
    def get(self):
        """
        returns a list of all text properties
        :return: a list of all text properties
        """
        adm = Administration()
        response = adm.get_all_text_properties()
        return response


@text_property_namespace.route('/entries/<int:id>')
@text_property_namespace.response(500, 'Something bad happend in the backend.')
@text_property_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@text_property_namespace.response(200, 'The request was ok')
class TextPropertyEntries_api(Resource):
    @secured
    def post(self, id):
        """
        creates a new text entry for a specified text property
        :param id: id of the text property we want to add an entry to
        :return: a json containing the ValueID for further usage in "post information"
        """
        adm = Administration()
        text_prop = adm.get_text_property_by_id(id)
        response = adm.add_text_entry(text_prop, api.payload)
        return response

    @secured
    def put(self, id):
        """
        updates an existing text entry of a text property
        :param id: id of the text entry (occupancy)
        :return: updated text entry as json
        """
        adm = Administration()
        response = adm.update_text_entry(id, api.payload)
        return response


"""
--------------------------------------------------------------------------------------------------------------
Information
--------------------------------------------------------------------------------------------------------------
"""

@information_namespace.route('/<int:id>')
@information_namespace.response(500, 'Something bad happend in the backend.')
@information_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@information_namespace.response(200, 'The request was ok')
class Information_api(Resource):
    @secured
    @information_namespace.marshal_with(information)
    def post(self, id):
        """
        creates a new information object for a given profile and a given ValueID. the profile is retrieved from the payload
        :param id: ValueID of the occupancy we want to assign to the profile.
        :return: new information object
        """
        adm = Administration()

        prof = Profile.from_dict(api.payload)
        response = adm.create_info(prof, id)
        return response

    @secured
    @information_namespace.marshal_with(information)
    def get(self, id):
        """
        Get an information objects by its id
        :param id: id of an information object
        :return: information object
        """
        adm = Administration()
        response = adm.get_info_by_id(id)
        return response

    @secured
    def put(self, id):
        """
        updates the information object with the given id
        :param id: id of the information object we want to update
        :return: updates information object
        """
        adm = Administration()
        info = adm.get_info_by_id(id)
        response = adm.update_info(info, api.payload)
        return response

    @secured
    @information_namespace.marshal_with(information)
    def delete(self, id):
        """
        deletes the information object with the given id
        :param id: id of the information object we want to delete
        :return: deleted information object
        """
        adm = Administration()
        info = adm.get_info_by_id(id)
        response = adm.delete_info(info)
        return response


@information_namespace.route('/infos/<int:id>')
@information_namespace.response(500, 'Something bad happend in the backend.')
@information_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@information_namespace.response(200, 'The request was ok')
class InformationList_api(Resource):
    # @information_namespace.marshal_list_with(information)
    @secured
    def get(self, id):
        """
        gets the content of all information objects of a given profile
        :param id: id of the profile we want to get information from
        :return: a list of the content of all information objects assigned to the given profile
        """
        adm = Administration()
        prof = adm.get_profile_by_id(id)
        infos = adm.get_infos_from_profile(prof)
        response = []
        for info in infos:
            response.append(adm.get_info_content(info))
        return response


@information_namespace.route('/content/<int:id>')
@information_namespace.response(500, 'Something bad happend in the backend.')
@information_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@information_namespace.response(200, 'The request was ok')
class InformationContent_api(Resource):  #
    @secured
    def get(self, id):
        """
        gets the content of an information object
        :param id: id of the information object
        :return: ValueID and Value of an occupancy entry the info object is referencing
        """
        adm = Administration()
        inf = adm.get_info_by_id(id)
        response = adm.get_info_content(inf)
        if response is not None:
            return response
        else:
            return '', 500


"""
--------------------------------------------------------------------------------------------------------------
User
--------------------------------------------------------------------------------------------------------------
"""

@init_user_namespace.route('/<string:email>')
@init_user_namespace.response(500, 'Something bad happend in the backend.')
@init_user_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@init_user_namespace.response(200, 'The request was ok')
class Init_user_api(Resource):
    @secured
    @init_user_namespace.marshal_with(user, code=200)
    def get(self, email):
        """
        Get the user_id of the given email
        :param email: the email, we want the user_id from
        :return: the user of the email
        """
        adm = Administration()
        return adm.get_user_by_email(email)


@user_namespace.route('/<int:id>')
@user_namespace.response(500, 'Something bad happend in the backend.')
@user_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@user_namespace.response(200, 'The request was ok')
class User_api(Resource):
    @secured
    @user_namespace.marshal_list_with(user, code=200)
    def get(self, id):
        """
        Get a specific user by user_id or if the user_id 1000 is given it will return a list of all users
        :param user_id: --
        :return: the wanted user
        """

        if id == 1000:  # Get all users
            adm = Administration()
            return adm.get_all_users()

        else:  # Get a specific user
            adm = Administration()
            return adm.get_user_by_id(id)

    @user_namespace.marshal_with(user, code=200)
    @user_namespace.expect(user)
    @secured
    def post(self, id):
        """
        Create a new user
        :param id: the id of the user -> nopt used
        :return: the created user
        """
        adm = Administration()
        return adm.add_new_user(api.payload)

    @user_namespace.marshal_with(user, code=200)
    @user_namespace.expect(user)
    @secured
    def delete(self, id):
        """
        Delete a user
        :param id: the id of the user which should be deleted
        :return: the deleted user
        """
        adm = Administration()
        payload = api.payload
        return adm.delete_user_with_all_relations(payload)

    @user_namespace.marshal_with(user, code=200)
    @user_namespace.expect(user)
    @secured
    def put(self, id):
        """
        Update a user
        :param id: the id of the user which is going to be updated
        :return: the updated user
        """
        adm = Administration()
        return adm.update_user(id, api.payload)


@all_user_namespace.route('/<int:id>')
@all_user_namespace.response(500, 'Something bad happend in the backend.')
@all_user_namespace.response(401, 'The user is unauthorized to perform this request. Set a valid token to go on.')
@all_user_namespace.response(200, 'The request was ok')
class All_User_api(Resource):

    @user_namespace.marshal_with(user, code=200)
    @secured
    def get(self, id):
        """
        Get a specific user by user_id
        :param user_id: id of the user who wants to get all users
        :return: all users except the user which are blocked by the user with the given id or blocked the user with the given id
        """
        adm = Administration()
        return adm.get_all_user_by_id(id)

"""
--------------------------------------------------------------------------------------------------------------
"""

if __name__ == '__main__':
    app.run(port=8000, debug=True)
