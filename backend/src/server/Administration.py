from backend.src.server.bo.BusinessObject import BusinessObject
from backend.src.server.bo.Profile import Profile
from backend.src.server.bo.User import User
from backend.src.server.bo.Property import Property
from backend.src.server.bo.Information import Information
from backend.src.server.db.BlocklistMapper import BlocklistMapper
from backend.src.server.db.BookmarklistMapper import BookmarklistMapper
from backend.src.server.db.ProfileMapper import ProfileMapper
from backend.src.server.db.UserMapper import UserMapper
from backend.src.server.db.SelectionPropertyMapper import SelectionPropertyMapper

from backend.src.server.db.InformationMapper import InformationMapper
from backend.src.server.db.PropertyMapper import PropertyMapper

from backend.src.server.db.MessageMapper import MessageMapper
from backend.src.server.db.ChatMapper import ChatMapper



#todo alle mapper importieren


class Administration():
    def __init__(self):
        pass


    '''
    User - Methoden
    '''
    def create_user(self, email, displayname, avatar_url):
        user = User()
        user.set_email(email)
        user.set_displayname(displayname)
        user.set_avatarurl(avatar_url)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_id(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_id(id)

    def get_user_by_name(self, name):
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_all_users(self):
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_email(self, email):
        with UserMapper() as mapper:
            return mapper.find_by_email(email)

    def update_user(self, user): #das selbe wie save user
        with UserMapper() as mapper:
            return mapper.update(user)

    def delete_user(self, user):
        with UserMapper() as mapper:
            mapper.delete(user)


    '''
    Profile Methoden
    '''

    def create_personal_profile_for_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                profile = Profile()
                profile.set_user_id(user.get_id())
                profile.set_is_personal(1)
                return mapper.insert(profile)
            else:
                return None

    def create_search_profile_for_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                profile = Profile()
                profile.set_user_id(user.get_id())
                profile.set_is_personal(0)
                return mapper.insert(profile)
            else:
                return None

    def get_all_profiles(self):
        with ProfileMapper() as mapper:
            return mapper.find_all()

    def get_profile_by_id(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_id(id)

    def get_personal_profile_of_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                return mapper.find_personal_profile_of_owner(user.get_id())
            else:
                return None

    def get_search_profiles_of_user(self, user):
        with ProfileMapper() as mapper:
            if user is not None:
                return mapper.find_search_profiles_of_owner(user.get_id())
            else:
                return None

    def get_profiles_with_information(self, info):
        with ProfileMapper() as mapper:
            return mapper.find_by_information(info)

    def update_profile(self, profile):
        with ProfileMapper() as mapper:
            return mapper.update(profile)

    def get_infos_from_profile(self, profile):
        with ProfileMapper() as mapper:
            if profile is not None:
                return mapper.find_all_infos(profile)
            else:
                return None

    def add_info_to_profile(self, profile, info):
        with ProfileMapper() as mapper:
            return mapper.add_info(profile, info)

    def remove_info_from_profile(self, profile, info):
        with ProfileMapper() as mapper:
            return mapper.remove_info(profile, info)

    def delete_profile(self, profile):
        with ProfileMapper() as mapper:
            infos = self.get_infos_from_profile(profile)
            # if infos is not None:
            for info in infos:
                self.remove_info_from_profile(profile, info)

            mapper.delete(profile)


    '''
    Information-Methoden
    '''

    def create_info(self, profile_id, value_id):
        information = Information()
        information.set_profile_id(profile_id)
        information.set_value_id(value_id)

        with InformationMapper() as mapper:
            return mapper.insert(information)

    def get_all_infos(self):
        with InformationMapper() as mapper:
            return mapper.find_all()

    def get_info_by_id(self, id):
        with InformationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_infos_of_property(self, property):
        with InformationMapper() as mapper:
            return mapper.find_by_property(property)

    def update_info(self, info):
        with InformationMapper() as mapper:
            return mapper.update(info)

    def delete_info(self, info):
        with InformationMapper() as mapper:
            profiles = self.get_profiles_with_information(info)
            if profiles is not None:
                for profile in profiles:
                    self.remove_info_from_profile(profile, info)

            mapper.delete(info)


    '''
    Property Methoden
    '''

    def create_property(self, value, is_selection, explanation):
        property = Property()
        property.set_name(value)
        property.set_is_selection(is_selection)
        property.set_description(explanation)

        with PropertyMapper() as mapper:
            return mapper.insert(property)


    def get_all_properties(self):
        with PropertyMapper() as mapper:
            return mapper.find_all()

    def get_property_by_id(self, id):
        with PropertyMapper() as mapper:
            return mapper.find_by_id(id)

    def get_property_by_name(self, name):
        with PropertyMapper() as mapper:
            return mapper.find_by_name(name)

    def update_property(self, property):
        with PropertyMapper() as mapper:
            return mapper.update(property)

    def delete_property(self, property):
        with PropertyMapper() as mapper:
            infos = self.get_infos_of_property(property)
            if infos is not None:
                for info in infos:
                    self.delete_info(info)

            mapper.delete(property)

    '''
        Bookmarklist Methoden
    '''

    def get_bookmarklist_by_user_id(self, user_id):
        with BookmarklistMapper() as mapper:
            return mapper.find_by_id(user_id)

    def add_user_to_bookmarklist(self, user_id, payload):
        with BookmarklistMapper() as mapper:
            return mapper.insert(user_id, payload)

    def remove_user_from_bookmarklist(self, user_id, payload):
        with BookmarklistMapper() as mapper:
            return mapper.delete(user_id, payload)


    '''
        Blocklist Methoden
    '''

    def get_blocklist_by_user_id(self, user_id):
        with BlocklistMapper() as mapper:
            return mapper.find_by_id(user_id)

    def add_user_to_blocklist(self, user_id, payload):
        with BlocklistMapper() as mapper:
            return mapper.insert(user_id, payload)

    def delete_blocklist(self, user_id, payload):
        with BlocklistMapper() as mapper:
            return mapper.delete(user_id, payload)

    '''
       Chat Methoden
    '''

    def get_chat_by_user_id(self, user_id):
        with ChatMapper() as mapper:
            return mapper.find_all(user_id)

    def add_chat_to_user(self, user_id, payload):
        with ChatMapper() as mapper:
            return mapper.insert(user_id, payload)


    '''
         Message Methoden
    '''


    def get_messages_by_chat_id(self, chat_id):
        with MessageMapper() as mapper:
            return mapper.find_by_id(chat_id)


    def add_message_to_chat(self, user_id, payload):
        with MessageMapper() as mapper:
            return mapper.insert(user_id, payload)


    """
    dewdsfs
    """
    def get_selection_props(self):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_all()

    def get_selec_by_id(self, id):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_by_id(id)

    def get_selec_name(self, name):
        with SelectionPropertyMapper() as mapper:
            return mapper.find_by_name(name)