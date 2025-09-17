import prisma from '../database/database.js';
import { hash, compare } from 'bcryptjs';

export async function register(req, res) {
    const { nome, usuario, email, telefone, senha } = req.body;
    try {
        const hashedPassword = await hash(senha, 10);

        const newUser = await prisma.userdata.create({
            data: {
                nome,
                usuario,
                email,
                telefone,
                senha: hashedPassword,
            },
        });
        const { senha: _, ...userWithoutPassword } = newUser;
        res.status(201).send({ message: 'Usuário criado com sucesso!', user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Erro ao criar usuário' });
    }
}

export async function login(req, res) {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).send({ message: 'Usuário e senha são obrigatórios' });
    }

    try {
        const user = await prisma.userdata.findUnique({
            where: { usuario },
        });

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        const isMatch = await compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).send({ message: 'Senha incorreta' });
        }

        const { senha: _, ...userWithoutPassword } = user;

        return res.status(200).send({
            message: 'Login bem-sucedido',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        return res.status(500).send({
            message: 'Erro no login. Tente novamente mais tarde.',
        });
    }
}
