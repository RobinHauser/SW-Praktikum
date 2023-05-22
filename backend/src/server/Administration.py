from src.server.bo.Profile import Profile
from src.server.bo.User import User
from src.server.db.BlocklistMapper import BlocklistMapper
from src.server.db.BookmarklistMapper import BookmarklistMapper
from src.server.db.ProfileMapper import ProfileMapper
from src.server.db.UserMapper import UserMapper


#todo alle mapper importieren


class Administration():
    def __init__(self):
        pass


    '''
    User - Methoden
    '''
    def create_user(self, firstname, lastname, email, birthdate, google_id):
        user = User()
        user.set_firstname(firstname)
        user.set_lastname(lastname)
        user.set_email(email)
        user.set_birthdate(birthdate)
        user.set_google_id(google_id)

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
            mapper.update(user)

    def delete_user(self, user):
        with UserMapper() as mapper:
            mapper.delete(user)


    '''
    Profile Methoden
    '''

    def create_profile(self, information, personal_profile):
        profile = Profile()
        profile.set_information(information)
        profile.set_personal_profile(personal_profile)

        with ProfileMapper() as mapper:
            return mapper.insert(profile)

    def get_profile_by_id(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_id(id)



    '''
        Bookmarklist Methoden
    '''

    def get_bookmarklist_by_user_id(self, id):
        mapper = BookmarklistMapper()
        result = mapper.find_by_id(id)
        return result

    def add_user_to_bookmarklist(self, user_id, payload):
        with BookmarklistMapper() as mapper:
            return mapper.insert(user_id, payload)

    def delete_bookmarklist(self, id):
        with BookmarklistMapper() as mapper:
            return mapper.delete(id)


    '''
        Blocklist Methoden
    '''

    def get_blocklist_by_user_id(self, id):
        with BlocklistMapper() as mapper:
            return mapper.find_by_id(id)

    def create_blocklist_for_user(self, id):
        with BlocklistMapper() as mapper:
            return mapper.insert(id)

    def delete_blocklist(self, id):
        with BlocklistMapper() as mapper:
            return mapper.delete(id)


    '''
       Chat Methoden
    '''

    def get_chat_by_user_id(self, user_id):
        pass








    def get_profile_by_user_id(self):
        with ProfileMapper() as mapper:
            return mapper.find_by_id()

