update postcode set longitude=st_x(st_transform(location,4326)), latitude=st_y(st_transform(location,4326));

update postcode set location = ST_SetSRID(ST_MakePoint(longitude, latitude),4326);