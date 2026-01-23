
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Music, Play } from 'lucide-react';

export default function ReorderableListPage() {
  const [playlist, setPlaylist] = useState([
      { id: 's1', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
      { id: 's2', title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
      { id: 's3', title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
      { id: 's4', title: 'Imagine', artist: 'John Lennon', duration: '3:01' },
      { id: 's5', title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01' },
      { id: 's6', title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' }
  ]);

  const moveUp = (index) => {
    if (index > 0) {
      const newItems = [...playlist];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setPlaylist(newItems);
    }
  };

  const moveDown = (index) => {
    if (index < playlist.length - 1) {
      const newItems = [...playlist];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setPlaylist(newItems);
    }
  };

  return (
    <>
      <Helmet>
        <title>Playlist Editor - UI Practice Hub</title>
        <meta name="description" content="Create and manage your music playlist" />
      </Helmet>

      <PageHeader title="Playlist Editor" subtitle="Create and manage your music playlist" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-sortable-container">
        <ControlPanel title="Edit Playlist">
          <ul className="space-y-2" data-testid="sortable-list">
            {playlist.map((song, index) => (
              <li key={song.id} className="flex items-center justify-between p-3 bg-muted/40 border rounded-lg hover:bg-muted/60 transition-colors" data-testid={`list-item-${index}`}>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground w-4 text-center font-mono text-sm">{index + 1}</span>
                    <div>
                        <div className="font-medium text-sm">{song.title}</div>
                        <div className="text-xs text-muted-foreground">{song.artist} • {song.duration}</div>
                    </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => moveUp(index)} disabled={index === 0} data-testid={`button-up-${index}`}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => moveDown(index)} disabled={index === playlist.length - 1} data-testid={`button-down-${index}`}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ControlPanel>

        <ResultPanel title="Now Playing Queue">
          <div className="space-y-4" data-testid="result-panel-order">
            <div className="bg-primary/5 p-4 rounded-lg flex items-center gap-4 mb-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                    <Play className="h-6 w-6 ml-1" />
                </div>
                <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wide">Up Next</div>
                    <div className="font-bold text-lg">{playlist[0].title}</div>
                    <div className="text-sm text-muted-foreground">{playlist[0].artist}</div>
                </div>
            </div>
            
            <ol className="list-none space-y-2">
                {playlist.slice(1).map((song, i) => (
                    <li key={song.id} className="text-sm flex justify-between py-2 border-b border-border/50">
                        <span className="flex gap-3">
                            <span className="text-muted-foreground w-4">{i + 2}</span>
                            <span>{song.title}</span>
                        </span>
                        <span className="text-muted-foreground font-mono text-xs">{song.duration}</span>
                    </li>
                ))}
            </ol>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
