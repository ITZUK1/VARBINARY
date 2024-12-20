CREATE TABLE Imagenes (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    imagen VARBINARY(MAX) NOT NULL
);

select * from Imagenes;

drop table Imagenes;