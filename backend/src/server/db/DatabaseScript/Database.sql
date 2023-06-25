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


-- blocklists erstellen
insert into blocklist (BlocklistID, UserID) VALUES (1,1);
insert into blocklist (BlocklistID, UserID) VALUES (2,2);
insert into blocklist (BlocklistID, UserID) VALUES (3,3);
insert into blocklist (BlocklistID, UserID) VALUES (4,4);
insert into blocklist (BlocklistID, UserID) VALUES (5,5);
insert into blocklist (BlocklistID, UserID) VALUES (6,6);


-- bookmarklisten erstellen
insert into bookmarklist (BookmarklistID, UserID) VALUES (1, 1);
insert into bookmarklist (BookmarklistID, UserID) VALUES (2, 2);
insert into bookmarklist (BookmarklistID, UserID) VALUES (3, 3);
insert into bookmarklist (BookmarklistID, UserID) VALUES (4, 4);
insert into bookmarklist (BookmarklistID, UserID) VALUES (5, 5);
insert into bookmarklist (BookmarklistID, UserID) VALUES (6, 6);

