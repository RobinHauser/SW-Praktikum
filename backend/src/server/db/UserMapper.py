from backend.src.server.bo.User import User
from backend.src.server.db.Mapper import Mapper


class UserMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()

        for user_from_list in users:
            try:
                user = User()
                user.set_user_id(user_from_list[0])
                user.set_email(user_from_list[1])
                user.set_displayname(user_from_list[2])
                user.set_avatarurl(user_from_list[3])
                result.append(user_from_list)
            except IndexError:
                result = None


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """
        Get user by id
        :param email: the email of the user we want to find
        :return: the found user
        """
        cursor = self._cnx.cursor()
        command = f'SELECT * FROM user WHERE UserID = {id}'
        cursor.execute(command)
        tuples = cursor.fetchone()

        try:
            user = User()
            user.set_user_id(tuples[0])
            user.set_email(tuples[1])
            user.set_displayname(tuples[2])
            user.set_avatarurl(tuples[3])
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
        """
        Get user by email
        :param email: the email of the user we want to find
        :return: the found user
        """
        cursor = self._cnx.cursor()
        command = f'SELECT * FROM user WHERE Email = "{email}"'
        cursor.execute(command)
        tuples = cursor.fetchone()

        try:
            user = User()
            user.set_user_id(tuples[0])
            user.set_email(tuples[1])
            user.set_displayname(tuples[2])
            user.set_avatarurl(tuples[3])
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

# todo umwandlungen in json?
