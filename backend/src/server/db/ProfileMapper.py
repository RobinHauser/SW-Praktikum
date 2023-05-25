from server.db import Mapper
from server.bo import Profile


class ProfileMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM profile")
        tuples = cursor.fetchall()

        for (profile_id, user_id, is_personal) in tuples:
            profile = Profile()
            profile.set_id(profile_id)
            profile.set_user_id(user_id)
            profile.set_is_personal(is_personal)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM profile WHERE ProfileID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (profile_id, user_id, is_personal) = tuples[0]
            profile = Profile()
            profile.set_id(profile_id)
            profile.set_user_id(user_id)
            profile.set_is_personal(is_personal)
            result = profile
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profile):
        cursor = self._cnx.cursor()

        command = "INSERT INTO profile (ProfileID, UserID, IsPersonal) VALUES (%s,%s,%s)"
        data = (profile.get_id(), profile.get_user_id(), profile.get_is_personal())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        cursor = self._cnx.cursor()

        command = "UPDATE profile SET ProfileID=%s, UserID=%s, IsPersonal=%s WHERE ProfileID=%s" #todo FALSCH!!!!
        data = (profile.get_id(), profile.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profile

    def delete(self, profile):
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(profile.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

        return profile

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
