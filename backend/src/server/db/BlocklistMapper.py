import json

from backend.src.server.bo import Blocklist
from backend.src.server.db import Mapper

Blocklist = Blocklist.Blocklist


class BlocklistMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, user_id):
        """
        Returns a list of all other users a user(with a user_id) has blocked
        :param user_id: the unique id of the user
        :return: a list of all blocked users. If there is no blocked user it will return an empty list.
        """
        result = []
        cursor = self._cnx.cursor()

        command = "SELECT * FROM blocklist WHERE UserID={}".format(user_id)
        cursor.execute(command)
        blocklist_tuple = cursor.fetchone()

        if blocklist_tuple is not None:
            blocklist_id = blocklist_tuple[0]

            # Retrieve bookmarklist by UserID
            command2 = "SELECT * FROM block WHERE BlocklistID={}".format(blocklist_id)
            cursor.execute(command2)
            blocks = cursor.fetchall()

            if blocks is not None:
                user_ids = [block[2] for block in blocks]

                # Retrieve user by UserID
                command3 = "SELECT * FROM user WHERE UserID IN ({})".format(','.join(str(uid) for uid in user_ids))
                cursor.execute(command3)
                users = cursor.fetchall()

                # Form the user into a json and add it to the list
                for user in users:
                    jsstr = f'{{"UserID": "{user[0]}", "email": "{user[1]}", "displayname": "{user[2]}", "dateOfBirth": "{user[3]}"}}'
                    userJSON = json.loads(jsstr)
                    result.append(userJSON)

        cursor.close()
        return result

    def insert(self, user_id, payload):
        """
        Adding a user to the blocklist of a user
        :param user_id: the unique id of the user with the bookmark list
        :param payload: the dic of the user to be added
        :return: the added user
        """
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT BlocklistID FROM blocklist WHERE UserID = {user_id}')

        blocklist_id = cursor.fetchall()[0][0]
        blocked_user_id = int(payload.get('id'))

        cursor.execute(
            f'INSERT INTO block (BlocklistID, BlockedUserID) VALUES ({blocklist_id}, {blocked_user_id})')

        self._cnx.commit()
        cursor.close()

        return payload

    def update(self, blocklist):
        pass

    def delete(self, user_id, payload):
        """
        Removing a user from the blocklist of a user
        :param user_id: the unique id of the user with the blocklist
        :param payload: the dic of the user to be deleted
        :return: the removed user
        """
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT BlocklistID FROM blocklist WHERE UserID = {user_id}')

        blocklist_id = cursor.fetchall()[0][0]
        blocked_user_id = int(payload.get('id'))

        cursor.execute(
            f'DELETE FROM block WHERE BlocklistID = {blocklist_id} AND BlockedUserID = {blocked_user_id}')

        self._cnx.commit()
        cursor.close()

        return payload

    def find_by_email(self, email):
        pass

    def find_by_name(self, name):
        pass
