from server.bo import User
from server.db import Mapper


class UserMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM user")
        tuples = cursor.fetchall()

        for (first_name, last_name, email, g_id, date_of_birth, owner) in tuples:
            user = User()
            user.set_first_name(first_name)
            user.set_last_name(last_name)
            user.set_email(email)
            user.set_g_id(g_id)
            user.set_date_of_birth(date_of_birth)
            user.set_owner(owner)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, first_name, last_name, email, g_id, date_of_birth, owner) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_first_name(first_name)
            user.set_last_name(last_name)
            user.set_email(email)
            user.set_g_id(g_id)
            user.set_date_of_birth(date_of_birth)
            user.set_owner(owner)
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE first_name LIKE '{}' OR last_name LIKE '{}'".format(name, name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, first_name, last_name, email, g_id, date_of_birth, owner) in tuples:
            user = User()
            user.set_id(id)
            user.set_first_name(first_name)
            user.set_last_name(last_name)
            user.set_email(email)
            user.set_g_id(g_id)
            user.set_date_of_birth(date_of_birth)
            user.set_owner(owner)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_email(self, email):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE email LIKE '{}'".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()



