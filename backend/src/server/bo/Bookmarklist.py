from BusinessObject import BusinessObject

class Bookmarklist(BusinessObject):
    bookmarklist_counter = 2000 # evtl den aktuellen Wert bei deployment immer aus der datenbank holen ?
    def __init__(self):
        #super().__init__(id)
        Bookmarklist.bookmarklist_counter+=1
        self.__bookmarklist_id = Bookmarklist.bookmarklist_counter
        self.__owner_id = 0
        self.__bookmarked_users = []

    def get_bookmarklist_id(self):
        return self.__bookmarklist_id

    def set_bookmarklist_id(self, bookmarklist_id):
        self.__bookmarklist_id = bookmarklist_id

    def get_owner_id(self):
        return self.__owner_id

    def set_owner_id(self, owner_id):
        self.__owner_id = owner_id

    def get_bookmarked_users(self):
        return self.__bookmarked_users

    def set_bookmarked_users(self, *users):
        self.__bookmarked_users = [users]

    def __str__(self):
        return "Bookmarklist: {}, {}, {}".format(self.__bookmarklist_id, self.__owner_id, self.__bookmarked_users)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Bookmarklist()
        obj.set_bookmarklist_id(dictionary["bookmarklist_id"])
        obj.set_owner_id(dictionary["owner_id"])
        obj.set_bookmarked_users(dictionary["bookmarked_users"])
        return obj