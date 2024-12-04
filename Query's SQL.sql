/* Criando o banco de dados principal */
CREATE DATABASE ControleFinanceiro;

/* Selecionando o banco de dados
USE ControleFinanceiro;

/* Criando tabela Categoria */
CREATE TABLE Categoria (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(50) NOT NULL
);

/* Criando tabela Usuario */
CREATE TABLE Usuario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Telefone VARCHAR(15),
    Data_nascimento DATE,
    CPF VARCHAR(11) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Senha VARCHAR(255) NOT NULL
);

/* Trigger para validar o telefone na tabela Usuario */
DELIMITER //
CREATE TRIGGER valida_telefone
BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    IF NEW.Telefone IS NULL OR LENGTH(NEW.Telefone) < 10 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Telefone inválido.';
    END IF;
END;
//
DELIMITER ;

/* Criando tabela Gasto */
CREATE TABLE Gasto (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Valor DECIMAL(10, 2) NOT NULL,
    Data DATE NOT NULL,
    Descricao VARCHAR(255),
    ID_Categoria INT NOT NULL,
    ID_Usuario INT NOT NULL,
    FOREIGN KEY (ID_Categoria) REFERENCES Categoria(ID),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID)
);

/* CRUD para a tabela Categoria */
-- CREATE
INSERT INTO Categoria (Nome) VALUES ('Gasto Fixo'), ('Comida'), ('Lazer');

-- READ
SELECT * FROM Categoria;

-- UPDATE
UPDATE Categoria SET Nome = 'Transporte' WHERE ID = 1;

-- DELETE
DELETE FROM Categoria WHERE ID = 3;

/* CRUD para a tabela Usuário */
-- CREATE
INSERT INTO Usuario (Nome, Telefone, Data_nascimento, CPF, Email, Senha)
VALUES ('João Silva', '11987654321', '1990-05-15', '12345678901', 'joao@email.com', 'senha123');

-- READ
SELECT * FROM Usuario;

-- UPDATE
UPDATE Usuario
SET Nome = 'João Souza', Telefone = '11912345678'
WHERE ID = 1;

-- DELETE
DELETE FROM Usuario WHERE ID = 1;

/* CRUD para a tabela Gasto */
-- CREATE
INSERT INTO Gasto (Valor, Data, Descricao, ID_Categoria, ID_Usuario)
VALUES (150.00, '2024-01-01', 'Compra de materiais', 1, 1);

-- READ
SELECT Gasto.ID, Gasto.Valor, Gasto.Data, Gasto.Descricao, Categoria.Nome AS Categoria, Usuario.Nome AS Usuario
FROM Gasto
LEFT JOIN Categoria ON Gasto.ID_Categoria = Categoria.ID
LEFT JOIN Usuario ON Gasto.ID_Usuario = Usuario.ID;

-- UPDATE
UPDATE Gasto
SET Valor = 200.00, Descricao = 'Compra revisada'
WHERE ID = 1;

-- DELETE
DELETE FROM Gasto WHERE ID = 1;