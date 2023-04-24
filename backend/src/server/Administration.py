from server.bo import User
from server.db import UserMapper
from server.db import ProfileMapper
from server.bo import Profile



class Administration():
    def __init__(self):
        pass


    #User Anlegen, und in der Datenbank speichern

    def create_user(self, first_name, last_name, email, g_id, date_of_birth, owner_id):
        user = User()
        user.set_first_name(first_name)
        user.set_last_name(last_name)
        user.set_email(email)
        user.set_g_id(g_id)
        user.set_date_of_birth(date_of_birth)
        user.set_owner(owner_id)

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

    def update_user(self, user):
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        with UserMapper() as mapper:
            mapper.delete(user)


    #Profile Anlegen, und in der Datenbank speichern

    def create_profile(self, information, personal_profile):
        profile = Profile()
        profile.set_information(information)
        profile.set_personal_profile(personal_profile)

        with ProfileMapper() as mapper:
            return mapper.insert(profile)

    def get_profile_by_id(self, id):
        with ProfileMapper() as mapper:
            return mapper.find_by_id(id)

