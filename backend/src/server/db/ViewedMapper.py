from src.server.bo.User import User
from src.server.db import Mapper


class ViewedMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, id):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param user_id: the unique id of the user OR SearchProfileID of unique SearchProfile
        :return: a sorted list of users
        """

        result = []
        cursor = self._cnx.cursor()

        # Check if Id is user_id or searchprofile_id
        if id >= 4000:
            command2 = f'SELECT UserID FROM profile_relation WHERE ProfileID = {id}'
            cursor.execute(command2)
            user_id = cursor.fetchall()
        else:
            user_id = [(id,)]


        # Get viewedList id of the user
        command = "SELECT ViewedListID FROM viewedlist WHERE UserID={}".format(user_id[0][0])
        cursor.execute(command)
        viewedList_id = cursor.fetchall()

        if len(viewedList_id) == 0:
            return result

        command = f'SELECT UserID FROM view WHERE ViewedListID={viewedList_id[0][0]}'
        cursor.execute(command)
        user_ids = cursor.fetchall()

        for user_id in user_ids:
            command = "SELECT * FROM user WHERE UserID={}".format(user_id[0])
            cursor.execute(command)
            tuples = cursor.fetchone()
            user = User()
            user.set_user_id(tuples[0])
            user.set_email(tuples[1])
            user.set_displayname(tuples[2])
            user.set_avatarurl(tuples[3])
            result.append(user)

           # jsstr = f'{{"UserID": "{user[0]}", "email": "{user[1]}", "displayname": "{user[2]}", "ProfileIMGURL": "{user[3]}"}}'
           # userJSON = json.loads(jsstr)
           # result.append(userJSON)

        cursor.close()
        return result

    def insert(self, id, payload):
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT ViewedListID FROM viewedlist WHERE UserID = {id}')

        viewedlist_id = cursor.fetchall()[0][0]
        viewed_user_id = int(payload.get('UserID'))

        command = f'SELECT * FROM view WHERE ViewedListID = {viewedlist_id}'
        cursor.execute(command)
        users = cursor.fetchall()

        for user in users:
            if user[2] == viewed_user_id:
                return payload


        cursor.execute(f'INSERT INTO view (ViewedListID, UserID) VALUES ({viewedlist_id}, {viewed_user_id})')

        self._cnx.commit()
        cursor.close()

        return payload

    def update(self, payload):
        pass

    def delete(self, user_id, payload):
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT ViewedListID FROM viewedlist WHERE UserID = {user_id}')

        viewedlist_id = cursor.fetchall()[0][0]
        viewed_user_id = int(payload.get('UserID'))

        cursor.execute(f'DELETE FROM view WHERE ViewedListID = {viewedlist_id} AND UserID = {viewed_user_id}')

        self._cnx.commit()
        cursor.close()

        return payload

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
