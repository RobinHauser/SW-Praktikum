from server.bo import User
from server.db import Mapper as Mapper


class UserMapper(Mapper.Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM user")
        tuples = cursor.fetchall()

        for (userid, email, displayname, avatarurl) in tuples:
            user = User()
            user.set_email(email)
            user.set_displayname(displayname)
            user.set_avatarurl(avatarurl)
            #user.set_g_id(g_id)
            #user.set_date_of_birth(date_of_birth)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE UserID={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (userid, email, displayname, avatarurl) = tuples[0]
            user = User()
            user.set_id(userid)
            user.set_email(email)
            user.set_displayname(displayname)
            user.set_avatarurl(avatarurl)
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE Displayname LIKE '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (displayname) in tuples:
            user = User()
            user.set_displayname(displayname)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_email(self, email):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE email LIKE '{}'".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (email) = tuples[0]
            user = User()
            user.set_email(email)
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM user ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            user.set_id(maxid[0] + 1)

        command = "INSERT INTO user (id, first_name, last_name, email, g_id, date_of_birth, owner) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (user.get_id(), user.get_first_name(), user.get_last_name(), user.get_email(), user.get_g_id(),
                user.get_date_of_birth(), user.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def update(self, user):
        cursor = self._cnx.cursor()

        command = "UPDATE user SET first_name=%s, last_name=%s, email=%s, g_id=%s, date_of_birth=%s, owner=%s WHERE id=%s"
        data = (
        user.get_first_name(), user.get_last_name(), user.get_email(), user.get_g_id(), user.get_date_of_birth(),
        user.get_owner(), user.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):
        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

