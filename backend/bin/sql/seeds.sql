INSERT INTO creators(username,email,first_name,last_name,password) 
VALUES
('Ophie_Husky','ophiehusky@gmail.com','Ophelia','husky','12345'),
('Matcha','matchatheShiba@gmail.com','Matcha','Shiba','678910');

INSERT INTO quizzes(creators_id,title) 
VALUES 
(1,'Ophie Test Quiz'),
(1,'Ophie Test 2'),
(2,'Matcha Test');

INSERT INTO questions(quizzes_id, question_text, image) 
VALUES
(1,'What is Ophie breed?','testing.img'),
(1,'How old is Ophie?','testing.img'),
(3,'What is Matcha breed?','testing.img'),
(3,'How old is Matcha?','testing.img'),
(3,'How old is Whiskey?','testing.img');

INSERT INTO answer_options(questions_id,correct, answer_text) 
VALUES
(1, 'true', 'Husky'),
(1, 'false', 'Nothing'),
(2, 'true', 'Shiba'),
(2, 'false', 'Cat');


-- INSERT INTO respondents(respondent_id,answer_options_id) 
-- VALUES