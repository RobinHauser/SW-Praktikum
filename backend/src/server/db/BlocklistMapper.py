from src.server.bo import Blocklist
from src.server.db import Mapper
from src.server.bo import User

Blocklist = Blocklist.Blocklist
User = User.User


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

        # Retrieve blocklist by UserID
        command = "SELECT * FROM blocklist WHERE UserID={}".format(user_id)
        cursor.execute(command)
        blocklist_tuple = cursor.fetchone()

        if blocklist_tuple is not None:
            blocklist_id = blocklist_tuple[0]

            # Retrieve blocked users by BlocklistID
            command2 = "SELECT * FROM block WHERE BlocklistID={}".format(blocklist_id)
            cursor.execute(command2)
            blocks = cursor.fetchall()

            if blocks is not None:
                user_ids = [block[2] for block in blocks]

                if len(user_ids) != 0:
                    # Retrieve user by UserID
                    command3 = "SELECT * FROM user WHERE UserID IN ({})".format(','.join(str(uid) for uid in user_ids))
                    cursor.execute(command3)
                    users = cursor.fetchall()

                    if len(users) != 0:
                        for user in users:
                            new_user = User()
                            new_user.set_user_id(user[0])
                            new_user.set_email(user[1])
                            new_user.set_displayname(user[2])
                            new_user.set_avatarurl(user[3])
                            result.append(new_user)

        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, user_id, blocked_user):
        """
        Adding a user to the blocklist of a user
        :param user_id: the unique id of the user with the blocklist
        :param blocked_user: the dic of the user to be added
        :return: the added user
        """
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT BlocklistID FROM blocklist WHERE UserID = {user_id}')

        #Get blocklist id out of SQL Command
        blocklist_id = cursor.fetchall()[0][0]
        blocked_user_id = blocked_user.get_user_id()

        # Insert User into block - Blocklist relation Table
        cursor.execute(
            f'INSERT INTO block (BlocklistID, BlockedUserID) VALUES ({blocklist_id}, {blocked_user_id})')

        self._cnx.commit()
        cursor.close()

        return blocked_user

    def update(self, blocklist):
        pass

    def delete(self, user_id, blocked_user):
        """
        Removing a user from the blocklist of a user
        :param user_id: the unique id of the user with the blocklist
        :param blocked_user: the dic of the user to be deleted
        :return: the removed user
        """
        cursor = self._cnx.cursor()

        cursor.execute(f'SELECT BlocklistID FROM blocklist WHERE UserID = {user_id}')

        blocklist_id = cursor.fetchall()[0][0]
        blocked_user_id = blocked_user.get_user_id()

        cursor.execute(
            f'DELETE FROM block WHERE BlocklistID = {blocklist_id} AND BlockedUserID = {blocked_user_id}')

        self._cnx.commit()
        cursor.close()

        return blocked_user



