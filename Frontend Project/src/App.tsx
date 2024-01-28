import React, { FormEvent, useState } from ` react `;
function AlbumPicker() {
    const [albums, setAlbums] = useState<string[]>([]);
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            artist: { value: string };
        };
        const artist = encodeURIComponent(target.artist.value);
        const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
        const response = await fetch(url);
        const mbResult = (await response.json()) as {
            releases: { title: string }[];
        };
        console.log(mbResult);
        const { releases } = mbResult;
        setAlbums(releases.map(({ title }) => title));
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Artist name:
                <input name="artist" />
            </label>
            <button type="submit">Search</button>
            <p>Albums:</p>
            <ol>
                {albums.map((album) => (
                    <li>{album}</li>
                ))}
            </ol>
        </form>
    );
}
function App() {
    return (
        <div>
            <h1>My Music App</h1>
            {/* Add AlbumPicker component here */}
            <AlbumPicker />
        </div>
    );
}
export default App;