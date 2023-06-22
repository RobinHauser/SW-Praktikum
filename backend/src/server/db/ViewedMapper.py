import json

from backend.src.server.db import Mapper


class ViewedMapper(Mapper.Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, user_id):
        result = []
        cursor = self._cnx.cursor()

        # Get viewedList id of the user
        command = "SELECT ViewedListID FROM viewedlist WHERE UserID={}".format(user_id)
        cursor.execute(command)

        viewedList_id = cursor.fetchone()[0]

        command = "SELECT UserID FROM view WHERE ViewedListID={}".format(viewedList_id)
        cursor.execute(command)

        user_ids = cursor.fetchall()

        for user_id in user_ids:
            command = "SELECT * FROM user WHERE UserID={}".format(user_id[0])
            cursor.execute(command)
            user = cursor.fetchone()
            jsstr = f'{{"UserID": "{user[0]}", "email": "{user[1]}", "displayname": "{user[2]}", "ProfileIMGURL": "{user[3]}"}}'
            userJSON = json.loads(jsstr)
            result.append(userJSON)

        cursor.close()
        return result

    def insert(self, user_id, payload):
        cursor = self._cnx.cursor()
        cursor.execute(f'SELECT ViewedListID FROM viewedlist WHERE UserID = {user_id}')

        viewedlist_id = cursor.fetchall()[0][0]
        viewed_user_id = int(payload.get('UserID'))


        command3 = f'SELECT * FROM blocklist WHERE UserID={payload.get("UserID")}'
        cursor.execute(command3)
        v3 = cursor.fetchall()
        command4 = f'SELECT * FROM block WHERE BlocklistID= {v3[0][0]}'
        cursor.execute(command4)
        v4 = cursor.fetchall()

        for i in v4:
            if int(i[2]) == int(user_id):
                return result
        else:
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
