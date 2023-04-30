from server.bo import Profile
from server.db import Mapper


class ProfileMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM profile")
        tuples = cursor.fetchall()

        for (id) in tuples:
            profile = Profile()
            profile.set_id(id)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM profile WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id) = tuples[0]
            profile = Profile()
            profile.set_id(id)
            result = profile
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profile):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            profile.set_id(maxid[0] + 1)

        command = "INSERT INTO profile (id) VALUES (%s)"
        data = (profile.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return profile

    def update(self, profile):
        cursor = self._cnx.cursor()

        command = "UPDATE profile SET id=%s WHERE id=%s"
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
