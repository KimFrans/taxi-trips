CREATE TABLE region(
    id serial not null primary key,
    name VARCHAR(100)
);

CREATE TABLE taxi(
    id serial not null primary key,
    reg_num VARCHAR(100),
    region_id int,
    foreign key (region_id) references region(id)
);

CREATE TABLE routes(
    id serial not null primary key,
    route_name VARCHAR(100),
    fare decimal (10,2)
);

CREATE TABLE trip(
    id serial not null primary key,
    taxi_reg_num int,
    route_name int,
    foreign key (taxi_reg_num) references taxi(id),
    foreign key (route_name) references routes(id)
);