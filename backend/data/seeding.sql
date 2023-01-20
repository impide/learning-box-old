-- Deploy formation:seeding to pg

BEGIN;

-- Contrainte qui sera 1 ou 2 (pour rôle)
INSERT INTO "teacher"("email", "pseudo", "password", "avatar", "role") VALUES 
('nathanael.rayapin@gmail.com', 'Nathanael', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 2),
('jeanjacque@gmail.com', 'Jean', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 2),
('adam@gmail.com', 'Adam', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 1);

-- Contrainte qui sera 0 (pour rôle)
INSERT INTO "user"("email", "pseudo", "password", "avatar", "role") VALUES 
('yanis@gmail.com', 'Yanis', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 0),
('zijun@gmail.com', 'Zijun', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 0),
('louis@gmail.com', 'Louis', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 0);

-- Mettre en place la logique pour les sous-categories (voir doc Slack)
INSERT INTO "category"("title", "description", "parent") VALUES 
('Leadership', 'category_1', null),
('Management', 'category_1', null),
('Connaissance de soi', 'category_2', 1),
('Communication', 'category_2', 1),
('Gestion de conflits', 'category_2', 1),
('Ressources humaines', 'category_2', 2),
('Gestion de projet', 'category_2', 2),
('Change management', 'category_2', 2);

INSERT INTO "course"("label", "course_description", "author", "language", "note","price", "comment", "video", "PDF", "teacher_id", "category_id") VALUES 
('Type de personnalité', 'La personnalité, ce sont tous les traits spécifiques qui composent l''individualité d''une personne : ses émotions, son attitude, son comportement.','Nathanael', 'Français', '[{"userId": 1, "note": 5}]', 2.99, '[{"userId": 1, "comment": "Je valide."}]','http://localhost:2000/files/type-de-personnalite.mp4','http://localhost:2000/files/type-de-personnalite.pdf',1,3),
('Attitude et Comportement', ' les attitudes désignent des dispositions positives ou négatives acquises exprimant ce que nous ressentons. Nos comportements désignent des réactions observables exprimant ce que nous faisons.', 'Jean', 'Français', '[{"userId": 2, "note": 3}]', 3.50, '[{"userId": 2, "comment": "Cours passionant !"}]', 'http://localhost:2000/files/attitude-et-comportement.mp4', 'http://localhost:2000/files/attitude-et-comportement.pdf', 2, 3),
('Valeurs et Croyances', 'Une Valeur va représenter ce qui est bien et ce qui n''est pas bien pour nous. Une croyance c''est ce qui va contribuer à construire notre carte pour avancer dans la vie.','Adam', 'Français', '[{"userId": 3, "note": 5}]', 3.99, '[{"userId": 3, "comment": "Point faible: trop fort !"}]','http://localhost:2000/files/valeurs-et-croyances.mp4','http://localhost:2000/files/valeurs-et-croyances.pdf',3, 3),
('Écoute active', 'Dans le cadre de la communication, l''écoute active est une façon structurée d''écouter son interlocuteur et de lui répondre.','Nathanael', 'Français', '[{"userId": 3, "note": 5}]', 3.99, '[{"userId": 3, "comment": "Très pertinent"}]','http://localhost:2000/files/ecoute-active.mp4','http://localhost:2000/files/ecoute-active.pdf',1, 4),
('Entretien d''embauche', 'L’entretien d''embauche ou entretien de recrutement a pour but de vérifier en quoi et comment les compétences du candidat sont à même de répondre au poste à pourvoir.','Jean', 'Français', '[{"userId": 3, "note": 5}]', 3.99, '[{"userId": 1, "comment": "A mettre en application !"}]','http://localhost:2000/files/entretien-embauche.mp4','http://localhost:2000/files/entretien-embauche.pdf',2, 6);

-- Contrainte pour éviter de mettre 1 cours en favorite 2 fois ou + 
INSERT INTO "be_favorite"("user_id", "course_id") VALUES 
(1, 1),
(2, 1),
(2, 2),
(3, 3);

COMMIT;

