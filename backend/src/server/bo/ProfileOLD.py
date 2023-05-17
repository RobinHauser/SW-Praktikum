from server.bo.BusinessObject import BusinessObject
from Property import Property
from TextProperty import TextProperty
from SelectionProperty import SelectionProperty

class Profile(BusinessObject):
    def __init__(self):
        super().__init__("Profile", [4001, 5000])
        self.__firstname = None
        self.__lastname = None
        self.__birthdate = None
        self.__haircolor = None
        self.__height = None
        self.__smoker = None
        self.__religion = None

        # todo personal profile bool

    def set_firstname(self, firstname):
        self.__firstname = TextProperty(firstname)

    def get_firstname(self):
        return self.__firstname.info.value

    def set_lastname(self, lastname):
        self.__lastname = TextProperty(lastname)

    def get_lastname(self):
        return self.__lastname.info.value

    def set_birthdate(self, birthdate):
        self.__birthdate = SelectionProperty(birthdate, ['Jan', 'Feb', 'Mar', ...])

    def get_birthdate(self):
        return self.__birthdate.info.value

    def set_haircolor(self, haircolor):
        self.__haircolor = SelectionProperty(haircolor, ['Blonde', 'Brunette', 'Red', ...])

    def get_haircolor(self):
        return self.__haircolor.info.value

    def set_height(self, height):
        self.__height = SelectionProperty(height, ['Short', 'Average', 'Tall', ...])

    def get_height(self):
        return self.__height.info.value

    def set_smoker(self, smoker):
        self.__smoker = SelectionProperty(smoker, ['Yes', 'No'])

    def get_smoker(self):
        return self.__smoker.info.value

    def set_religion(self, religion):
        self.__religion = SelectionProperty(religion, ['Christianity', 'Islam', 'Judaism', ...])

    def get_religion(self):
        return self.__religion.info.value

    def __str__(self):
        return "Profile: {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_firstname(),
                                                                self.get_lastname(), self.get_birthdate(),
                                                                self.get_haircolor(), self.get_height(),
                                                                self.get_smoker(), self.get_religion())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profile()
        obj.set_id(dictionary["id"])
        obj.set_firstname(dictionary["firstname"]) #achtung: wenn probleme entstehen, dann weil in den attributen Information-Objekte stecken
        obj.set_lastname(dictionary["lastname"])
        obj.set_birthdate(dictionary["birthdate"])
        obj.set_haircolor(dictionary["haircolor"])
        obj.set_height(dictionary["height"])
        obj.set_smoker(dictionary["smoker"])
        obj.set_religion(dictionary["religion"])
        return obj