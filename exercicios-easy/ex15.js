class Musica {
    constructor(titulo, artista, duracao) {
        this.titulo = titulo
        this.artista = artista
        this.duracao = duracao
    }
}

class Playlist {
    constructor(nome) {
        this.nome = nome
        this.musicas = []
    }

    adicionarMusica(musica) {
        this.musicas.push(musica)
        console.log(`Música "${musica.titulo}" adicionada à playlist "${this.nome}".`)
    }

    reproduzir() {
        console.log(`Reproduzindo playlist "${this.nome}":`)
        this.musicas.forEach((musica, index) => {
            console.log(`${index + 1}. ${musica.titulo} - ${musica.artista} (${musica.duracao} min)`)
        })
    }
}

class BibliotecaMusical {
    constructor(usuario) {
        this.usuario = usuario
        this.musicas = []
    }

    adicionarMusica(musica) {
        this.musicas.push(musica)
        console.log(`Música "${musica.titulo}" adicionada à biblioteca de ${this.usuario.nome}.`)
    }

    criarPlaylist(nome) {
        const playlist = new Playlist(nome)
        this.usuario.playlists.push(playlist)
        console.log(`Playlist "${nome}" criada para ${this.usuario.nome}.`)
        return playlist
    }

    adicionarMusicaAPlaylist(playlist, musica) {
        playlist.adicionarMusica(musica)
    }
}

class Usuario {
    constructor(nome) {
        this.nome = nome
        this.bibliotecaMusical = new BibliotecaMusical(this)
        this.playlists = []
    }
}

const usuarioExemplo = new Usuario('Ana')

const musica1 = new Musica('Shape of You', 'Ed Sheeran', '4:23')
const musica2 = new Musica('Blinding Lights', 'The Weeknd', '3:20')
const musica3 = new Musica('Dance Monkey', 'Tones and I', '3:30')

usuarioExemplo.bibliotecaMusical.adicionarMusica(musica1)
usuarioExemplo.bibliotecaMusical.adicionarMusica(musica2)
usuarioExemplo.bibliotecaMusical.adicionarMusica(musica3)

const playlistFavoritas = usuarioExemplo.bibliotecaMusical.criarPlaylist('Favoritas')
usuarioExemplo.bibliotecaMusical.adicionarMusicaAPlaylist(playlistFavoritas, musica1)
usuarioExemplo.bibliotecaMusical.adicionarMusicaAPlaylist(playlistFavoritas, musica2)

const playlistTreino = usuarioExemplo.bibliotecaMusical.criarPlaylist('Treino')
usuarioExemplo.bibliotecaMusical.adicionarMusicaAPlaylist(playlistTreino, musica3)

playlistFavoritas.reproduzir()
playlistTreino.reproduzir()
