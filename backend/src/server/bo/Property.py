from server.bo import BusinessObject as bo
from server.bo import Information
Information = Information.Information # https://stackoverflow.com/questions/4534438/typeerror-module-object-is-not-callable

class Property(bo.BusinessObject):

    def __init__(self, name, value):
        super().__init__()
        self.__name = name
        self.__content = Information(value)

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_content(self):
        return self.__content

    def set_content(self, content):
        self.__content = content





p = Property(name="Religion", value="Islam")

print(p.get_name(), p.get_content().get_value())

