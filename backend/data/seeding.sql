BEGIN;

INSERT INTO "teacher"("email", "pseudo", "password", "avatar", "role") VALUES 
('nathanael.rayapin@gmail.com', 'Nathanael', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 2),
('jeanjacque@gmail.com', 'Jean', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 1);

INSERT INTO "user"("email", "pseudo", "password", "avatar", "role") VALUES 
('yanis@gmail.com', 'Yanis', 'Azerty123', 'https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80', 0);

INSERT INTO "category"("title", "description", "parent") VALUES 
('Leadership', 'category_1', null),
('Management', 'category_1', null),
('Connaissance de soi', 'category_2', 1),
('Communication', 'category_2', 1),
('Gestion de conflits', 'category_2', 1),
('Ressources humaines', 'category_2', 2),
('Gestion de projet', 'category_2', 2),
('Change management', 'category_2', 2);

INSERT INTO "course"("label", "course_description","poster", "author", "language", "note","price", "comment", "video", "PDF", "teacher_id", "category_id") VALUES 
(
    'Qu’est-ce que la gestion des ressources humaines ?', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    4.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    6
),
(
    'Le recrutement', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    2.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    6
),
(
    'La gestion des compétences et des carrières', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    3.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    6
),
(
    'La rémunération', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    3.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    6
),
(
    'S’approprier les notions clés de la gestion de projet', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    5.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    7
),
(
    'Identifier le rôle et les responsabilités du chef de projet', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    5.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    7
),
(
    'Identifier les étapes clés d’un projet et le processus de mise en œuvre', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    4.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    7
),
(
    'Conduire un projet en mettant en œuvre une méthode et des outils opérationnels', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    3.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    7
),
(
    'Les facteurs du comportement', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    4.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    5
),
(
    'La dynamique comportementale', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    6.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    5
),
(
    'La communication', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Nathanael', 
    'Français', 
    '[]', 
    4.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    1,
    5
),
(
    'Organisation', 
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'http://localhost:2000/images/poster-video.png', 
    'Jean Jacque', 
    'Français', 
    '[]', 
    3.99, 
    '[]',
    'http://localhost:2000/files/course_video.mp4',
    'http://localhost:2000/files/course_pdf.pdf',
    2,
    5
);

INSERT INTO "be_favorite"("user_id", "course_id") VALUES 
(1, 1);

COMMIT;

