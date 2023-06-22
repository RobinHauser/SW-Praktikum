/*
create table user
(
    UserID    int not null
        primary key auto_increment,
    Email     nvarchar(100) not null,
    Displayname nvarchar(100) not null,
    AvatarURL  nvarchar(1000) not null
);

create table profile
(
    ProfileID int not null
        primary key,
    UserID    int not null,
    isPersonal tinyint(1) not null,
    constraint fk_profile_user
        foreign key (UserID) references user (UserID)
);

create table selection_property
(
    SelectionPropertyID int not null
        primary key,
    Value      varchar(100) not null,
    Description varchar(100) not null
);

create table text_property
(
    TextPropertyID int not null
        primary key,
    Value      varchar(100) not null,
    Description varchar(100) not null
);

create table selection_information
(
    SelectionInformationID int not null
        primary key,
    SelectionPropertyID int not null,
    Value varchar(100) not null,
    constraint fk_selection_information_property
        foreign key (SelectionPropertyID) references selection_property (SelectionPropertyID)
);

create table text_information
(
    TextInformationID int not null
        primary key,
    TextPropertyID int not null,
    Value varchar(100) not null,
    constraint fk_text_information_property
        foreign key (TextPropertyID) references text_property (TextPropertyID)
);

create table selection_info_assignment
(
    SelectionAssignmentID    int not null AUTO_INCREMENT
        primary key,
    ProfileID     int not null,
    SelectionInformationID int not null,
    constraint fk_selection_assignment_profile
        foreign key (ProfileID) references profile (ProfileID),
    constraint fk_selection_assignment_information
        foreign key (SelectionInformationID) references selection_information (SelectionInformationID)
);
alter table selection_info_assignment AUTO_INCREMENT=9001;


create table text_info_assignment
(
    TextAssignmentID    int not null AUTO_INCREMENT
        primary key,
    ProfileID     int not null,
    TextInformationID int not null,
    constraint fk_text_assignment_profile
        foreign key (ProfileID) references profile (ProfileID),
    constraint fk_text_assignment_information
        foreign key (TextInformationID) references text_information (TextInformationID)
);
alter table text_info_assignment AUTO_INCREMENT=10001;

create table blocklist
(
    BlocklistID int not null
        primary key AUTO_INCREMENT,
    UserID int not null,
    constraint fk_blocklist_user
        foreign key (UserID) references user (UserID)
);

create table block
(
    BlockID     int not null AUTO_INCREMENT
        primary key,
    BlocklistID int not null,
    BlockedUserID      int not null,
    constraint fk_block_user
        foreign key (BlockedUserID) references user (UserID),
    constraint fk_block_blocklist
        foreign key (BlocklistID) references blocklist (BlocklistID)
);
alter table block AUTO_INCREMENT=13001;

create table bookmarklist
(
    BookmarklistID int not null
        primary key AUTO_INCREMENT,
    UserID         int not null,
    constraint fk_bookmarklist_user
        foreign key (UserID) references user (UserID)
);

create table bookmark
(
    BookmarkID     int not null AUTO_INCREMENT
        primary key,
    BookmarklistID int not null,
    BookmarkedUserID int not null,
    constraint fk_bookmark_user
        foreign key (BookmarkedUserID) references user (UserID),
    constraint fk_bookmark_bookmarklist
        foreign key (BookmarklistID) references bookmarklist (BookmarklistID)
);
alter table bookmark AUTO_INCREMENT=12001;


create table chatrelation
(
    ChatID  int not null
        primary key,
    UserID  int not null,
    UserID2 int not null,
    constraint chatrelation2_user_UserID_fk2
        foreign key (UserID2) references user (UserID),
    constraint chatrelation_user_UserID_fk
        foreign key (UserID) references user (UserID)
);

create index chatrelation_user_UserID_fk2
    on chatrelation (UserID);

create table message
(
    MessageID int auto_increment
        primary key,
    Sender    int          null,
    Content   varchar(500) null,
    TimeStamp datetime     not null,
    constraint fk_message_user
        foreign key (Sender) references user (UserID)
);

create table chatcontainer
(
    ChatRelationID int auto_increment
        primary key,
    ChatID         int not null,
    MessageID      int not null,
    constraint fk_chatcontainer_chatrelation
        foreign key (ChatID) references chatrelation (ChatID),
    constraint fk_chatcontainer_message
        foreign key (MessageID) references message (MessageID)
);

create table viewedlist
(
    ViewedListID int not null
        primary key AUTO_INCREMENT,
    UserID     int not null,
    constraint fk_viewedlist_user
        foreign key (UserID) references user (UserID)
);

create table view
(
    ViewID     int not null
        primary key AUTO_INCREMENT,
    ViewedListID int not null,
    UserID     int null,
    constraint fk_view_viewedlist
        foreign key (ViewedListID) references viewedlist (ViewedListID)
);

-- --------------------------------------------------------------------------------------

-- user erstellen
insert into user (UserID, Email, Displayname, AvatarURL) values (1001, 'ek103@hdm-stuttgart.de', 'Elias', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1002, 'rh086@hdm-stuttgart.de', 'Robin', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1003, 'bt036@hdm-stuttgart.de', 'Björn', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1004, 'tk172@hdm-stuttgart.de', 'Theo', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1005, 'mb396@hdm-stuttgart.de', 'Michael', 'tbd.de');
insert into user (UserID, Email, Displayname, AvatarURL) values (1006, 'haug.jannik@gmail.com', 'Jannik', 'tbd.de');

-- blocklisten erstellen / zuweisen
insert into blocklist (BlocklistID, UserID) VALUES (3001, 1001);
insert into blocklist (BlocklistID, UserID) VALUES (3002, 1002);
insert into blocklist (BlocklistID, UserID) VALUES (3003, 1003);
insert into blocklist (BlocklistID, UserID) VALUES (3004, 1004);
insert into blocklist (BlocklistID, UserID) VALUES (3005, 1005);
insert into blocklist (BlocklistID, UserID) VALUES (3006, 1006);

-- bookmarklisten erstellen / zuweisen
insert into bookmarklist (BookmarklistID, UserID) VALUES (2001, 1001);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2002, 1002);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2003, 1003);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2004, 1004);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2005, 1005);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2006, 1006);

-- profile erstellen / zuweisen
insert into profile (ProfileID, UserID, isPersonal) VALUES (4001, 1001, 1);
insert into profile (ProfileID, UserID, isPersonal) VALUES (4002, 1002, 1);
insert into profile (ProfileID, UserID, isPersonal) VALUES (4003, 1003, 1);
insert into profile (ProfileID, UserID, isPersonal) VALUES (4004, 1004, 1);
insert into profile (ProfileID, UserID, isPersonal) VALUES (4005, 1005, 1);
insert into profile (ProfileID, UserID, isPersonal) VALUES (4006, 1006, 1);

-- selection properties erstellen
insert into selection_property (SelectionPropertyID, Value, Description) VALUES (7001, 'Hair Color', 'select your hair color');
insert into selection_property (SelectionPropertyID, Value, Description) VALUES (7002, 'Height', 'select your height range');
insert into selection_property (SelectionPropertyID, Value, Description) VALUES (7003, 'Smoker', 'select your smoking behaviour');
insert into selection_property (SelectionPropertyID, Value, Description) VALUES (7004, 'Religion', 'select your religion');

-- text properties erstellen
insert into text_property (TextPropertyID, Value, Description) VALUES (8001, 'First Name', 'enter your first name');
insert into text_property (TextPropertyID, Value, Description) VALUES (8002, 'Last Name', 'enter your last name');
insert into text_property (TextPropertyID, Value, Description) VALUES (8003, 'Birthdate', 'enter your birthdate');

-- selection informations erstellen
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5001, 7001, 'Black');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5002, 7001, 'Blond');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5003, 7001, 'Brown');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5004, 7001, 'Gray');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5005, 7001, 'Red');

insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5006, 7002, '< 150 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5007, 7002, '150 - 160 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5008, 7002, '160 - 170 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5009, 7002, '170 - 180 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5010, 7002, '180 - 190 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5011, 7002, '190 - 200 cm');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5012, 7002, '> 200 cm');

insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5013, 7003, 'Yes');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5014, 7003, 'No');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5015, 7003, 'Only when drunk');

insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5016, 7004, 'Christianity');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5017, 7004, 'Islam');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5018, 7004, 'Judaism');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5019, 7004, 'Hinduism');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5020, 7004, 'Buddhism');
insert into selection_information (SelectionInformationID, SelectionPropertyID, Value) VALUES (5021, 7004, 'Atheism');

-- blocks erzeugen
insert into block (BlocklistID, BlockedUserID) VALUES (3002, 1004); -- robin blockt theo
insert into block (BlocklistID, BlockedUserID) VALUES (3005, 1001); -- michi blockt elias

-- bookmarks erzeugen
insert into bookmark (BookmarklistID, BookmarkedUserID) VALUES (2004, 1003); -- theo merkt björn
insert into bookmark (BookmarklistID, BookmarkedUserID) VALUES (2006, 1005); -- jannik merkt michi

-- selection infos zuweisen
insert into selection_info_assignment (ProfileID, SelectionInformationID) VALUES (4003, 5006); -- björn ist unter 150cm
insert into selection_info_assignment (ProfileID, SelectionInformationID) VALUES (4006, 5020); -- jannik ist buddhist
insert into selection_info_assignment (ProfileID, SelectionInformationID) VALUES (4001, 5005); -- elias hat rote haare
insert into selection_info_assignment (ProfileID, SelectionInformationID) VALUES (4004, 5012); -- theo ist über 2 meter




-- Messages befüllen
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20001, 1004, 'Hallo', '2023-02-10 12:00:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20002, 1003, 'Heyy', '2023-02-10 12:00:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20003, 1004, 'Wie gehts dir', '2023-02-10 12:01:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20004, 1003, 'Gut soweit und dir?', '2023-02-10 12:01:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20005, 1004, 'Gut, danke der Nachfrage', '2023-02-10 12:05:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20006, 1004, 'Lass treffen?', '2023-02-10 12:10:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20007, 1003, 'WTF?', '2023-02-10 12:20:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20008, 1004, 'Ja so auf entspannt', '2023-02-10 12:40:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20009, 1003, 'Achso ja oke', '2023-02-10 12:50:00');
INSERT INTO message (MessageID, Sender, Content, TimeStamp) VALUES (20010, 1003, '20Uhr kannst mich abholen', '2023-02-10 12:56:00');

-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20001);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20002);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20003);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20004);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20005);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20006);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20007);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20008);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20009);
-- INSERT INTO chatcontainer (ChatID, MessageID) VALUES (30001, 20010);
-- INSERT INTO chatrelation (ChatID, UserID, UserID2) VALUES (30001, 1004, 1003);


INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15001, 1001);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15002, 1002);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15003, 1003);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15004, 1004);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15005, 1005);
INSERT INTO viewedlist (ViewedListID, UserID) VALUES (15006, 1006);


INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16001, 15001, 1004);
INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16002, 15004, 1002);
INSERT INTO view (ViewID, ViewedListID, UserID) VALUES (16003, 15004, 1003);



*/




create table profile
(
    ProfileID  int        not null
        primary key,
    IsPersonal tinyint(1) not null
);

create table property
(
    PropertyID  int                          not null
        primary key,
    Name        varchar(100) charset utf8mb3 not null,
    IsSelection tinyint(1)                   not null,
    Description varchar(200)                 not null
);

create table property_assignment
(
    ValueID    int not null
        primary key,
    PropertyID int not null,
    constraint fk_assignment_to_property
        foreign key (PropertyID) references property (PropertyID)
);

create table occupancies
(
    ValueID int                          not null
        primary key,
    Value   varchar(100) charset utf8mb3 not null,
    constraint fk_occupancies_to_assignment
        foreign key (ValueID) references property_assignment (ValueID)
);

create table information
(
    InformationID int not null
        primary key,
    ProfileID     int not null,
    ValueID       int not null,
    constraint fk_information_to_characteristics
        foreign key (ValueID) references occupancies (ValueID),
    constraint fk_information_to_profile
        foreign key (ProfileID) references profile (ProfileID)
);

create table user
(
    UserID      int auto_increment
        primary key,
    Email       varchar(100) charset utf8mb3  not null,
    Displayname varchar(100) charset utf8mb3  not null,
    AvatarURL   varchar(1000) charset utf8mb3 not null
);

create table blocklist
(
    BlocklistID int auto_increment
        primary key,
    UserID      int not null,
    constraint fk_blocklist_user
        foreign key (UserID) references user (UserID)
);

create table block
(
    BlockID       int auto_increment
        primary key,
    BlocklistID   int not null,
    BlockedUserID int not null,
    constraint fk_block_blocklist
        foreign key (BlocklistID) references blocklist (BlocklistID),
    constraint fk_block_user
        foreign key (BlockedUserID) references user (UserID)
);

create table bookmarklist
(
    BookmarklistID int auto_increment
        primary key,
    UserID         int not null,
    constraint fk_bookmarklist_user
        foreign key (UserID) references user (UserID)
);

create table bookmark
(
    BookmarkID       int auto_increment
        primary key,
    BookmarklistID   int not null,
    BookmarkedUserID int not null,
    constraint fk_bookmark_bookmarklist
        foreign key (BookmarklistID) references bookmarklist (BookmarklistID),
    constraint fk_bookmark_user
        foreign key (BookmarkedUserID) references user (UserID)
);

create table chatrelation
(
    ChatID               int not null,
    UserID               int not null,
    UserRelationToChatID int auto_increment
        primary key,
    constraint chatrelation_user_UserID_fk
        foreign key (UserID) references user (UserID)
);

create index chatrelation_chatcontainer_ChatID_fk
    on chatrelation (ChatID);

create index chatrelation_user_UserID_fk2
    on chatrelation (UserID);

create table message
(
    MessageID int auto_increment
        primary key,
    Sender    int          null,
    Content   varchar(500) null,
    TimeStamp datetime     not null,
    constraint fk_message_user
        foreign key (Sender) references user (UserID)
);

create table chatcontainer
(
    ChatRelationID int auto_increment
        primary key,
    ChatID         int not null,
    MessageID      int not null,
    constraint chatcontainer_chatrelation_ChatID_fk
        foreign key (ChatID) references chatrelation (ChatID),
    constraint fk_chatcontainer_message
        foreign key (MessageID) references message (MessageID)
);

create table profile_relation
(
    ProfileID int not null
        primary key,
    UserID    int not null,
    constraint fk_profile_rel_to_profile
        foreign key (ProfileID) references profile (ProfileID),
    constraint fk_profile_rel_to_user
        foreign key (UserID) references user (UserID)
);

create table viewedlist
(
    ViewedListID int auto_increment
        primary key,
    UserID       int not null,
    constraint fk_viewedlist_user
        foreign key (UserID) references user (UserID)
);

create table view
(
    ViewID       int auto_increment
        primary key,
    ViewedListID int not null,
    UserID       int null,
    constraint fk_view_viewedlist
        foreign key (ViewedListID) references viewedlist (ViewedListID)
);


-- user erstellen
insert into user (Email, Displayname, AvatarURL) values ('mitschiedielitschi@gmail.com', 'Mitschie Die Litschi', 'https://lh3.googleusercontent.com/a/AAcHTtedTZNO14zVppC5SEpk7Y0PqO1xQXHflen9WWCa=s96-c');
insert into user (Email, Displayname, AvatarURL) values ('michaelbergdolt20@gmail.com', 'Michi B', 'https://lh3.googleusercontent.com/a/AGNmyxaXXuFmABo3wRfKm4RFHX-UXBgvXmMXoZFqVR956Q=s96-c');
insert into user (Email, Displayname, AvatarURL) values ('haug.jannik@gmail.com', 'Jannik Haug', 'https://lh3.googleusercontent.com/a/AGNmyxZqDjGElyQDrT3qVr-8fC_l1e-JYfN72TKEKfUB=s96-c');
insert into user (Email, Displayname, AvatarURL) values ('haug.jannik98@gmail.com', 'Jannik Haug', 'https://lh3.googleusercontent.com/a/AAcHTtfTsKPlHkmt1iujaHMUE6l8477mcIFpMKWPWrT3=s96-c');
insert into user (Email, Displayname, AvatarURL) values ('sinnlos98@gmail.com', 'Frodo Beutlin', 'https://lh3.googleusercontent.com/a/AAcHTtc3uhg7g96OGDJwRDUwLG2WzTeqvRPVQZES3dY=s96-c');
insert into user (Email, Displayname, AvatarURL) values ('bjoern.till@web.de', 'Björn', 'https://lh3.googleusercontent.com/a/AGNmyxYH3fcvoHQe0ZgAFC2nhHkjCxt6MRM1-wyMifU1wA=s96-c');


-- profile erstellen
insert into profile (ProfileID, IsPersonal) VALUES (4001, 1);
insert into profile (ProfileID, IsPersonal) VALUES (4002, 1);
insert into profile (ProfileID, IsPersonal) VALUES (4003, 1);
insert into profile (ProfileID, IsPersonal) VALUES (4004, 1);
insert into profile (ProfileID, IsPersonal) VALUES (4005, 1);
insert into profile (ProfileID, IsPersonal) VALUES (4006, 1);

-- profile zuweisen
insert into profile_relation (ProfileID, UserID) VALUES (4001, 1);
insert into profile_relation (ProfileID, UserID) VALUES (4002, 2);
insert into profile_relation (ProfileID, UserID) VALUES (4003, 3);
insert into profile_relation (ProfileID, UserID) VALUES (4004, 4);
insert into profile_relation (ProfileID, UserID) VALUES (4005, 5);
insert into profile_relation (ProfileID, UserID) VALUES (4006, 6);


-- properties erstellen
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6001, 'Hair Color', 1, 'Please describe the color of your hair');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6002, 'Height', 1, 'Please select your height');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6003, 'Smoker', 1, 'Please state your smoking behaviour');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6004, 'Religion', 1, 'Please state your religious beliefs');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6005, 'First Name', 0, 'Please enter your first name');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6006, 'Last Name', 0, 'Please enter your last name');
insert into property (PropertyID, Name, IsSelection, Description) VALUES (6007, 'Biography', 0, 'Please describe yourself and your interests');


-- property assignments erstellen
insert into property_assignment (ValueID, PropertyID) VALUES (7001, 6001);
insert into property_assignment (ValueID, PropertyID) VALUES (7002, 6001);
insert into property_assignment (ValueID, PropertyID) VALUES (7003, 6001);
insert into property_assignment (ValueID, PropertyID) VALUES (7004, 6002);
insert into property_assignment (ValueID, PropertyID) VALUES (7005, 6002);
insert into property_assignment (ValueID, PropertyID) VALUES (7006, 6003);
insert into property_assignment (ValueID, PropertyID) VALUES (7007, 6003);
insert into property_assignment (ValueID, PropertyID) VALUES (7008, 6007);
insert into property_assignment (ValueID, PropertyID) VALUES (7009, 6007);

-- Ausprägungen erstellen
insert into occupancies (ValueID, Value) VALUES (7001, 'Brown');
insert into occupancies (ValueID, Value) VALUES (7002, 'Schwarz');
insert into occupancies (ValueID, Value) VALUES (7003, 'Blond');
insert into occupancies (ValueID, Value) VALUES (7004, '< 2m');
insert into occupancies (ValueID, Value) VALUES (7005, '> 2m');
insert into occupancies (ValueID, Value) VALUES (7006, 'yes');
insert into occupancies (ValueID, Value) VALUES (7007, 'no');
insert into occupancies (ValueID, Value) VALUES (7008, 'Was geht ab');
insert into occupancies (ValueID, Value) VALUES (7009, 'Dies ist meine Biographie');

-- info objekte erzeugen
insert into information (InformationID, ProfileID, ValueID) VALUES (5001, 4001, 7003);
insert into information (InformationID, ProfileID, ValueID) VALUES (5002, 4004, 7006);
insert into information (InformationID, ProfileID, ValueID) VALUES (5003, 4002, 7004);
insert into information (InformationID, ProfileID, ValueID) VALUES (5004, 4001, 7005);
insert into information (InformationID, ProfileID, ValueID) VALUES (5005, 4006, 7008);
