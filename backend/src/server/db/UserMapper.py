from server.bo import User
from server.db import Mapper as Mapper

User = User.User
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
            user.set_id(userid)
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

    def find_by_email(self, email):
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE email LIKE '{}'".format(email)
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

    def insert(self, user):
        cursor = self._cnx.cursor()

        command = "INSERT INTO user (userid, email, displayname, avatarurl) VALUES (%s,%s,%s,%s)"
        data = (user.get_id(), user.get_email(), user.get_displayname(), user.get_avatarurl())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def update(self, user):
        cursor = self._cnx.cursor()

        command = "UPDATE user SET Email=%s, Displayname=%s, AvatarURL=%s WHERE UserID=%s"
        data = (user.get_email(), user.get_displayname(), user.get_avatarurl())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def delete(self, user):
        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE UserID={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

        return user

#todo umwandlungen in json?
