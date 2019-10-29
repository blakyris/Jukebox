<?php

namespace App\Service;

use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Service\TagEditor;

use App\Document\File;
use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

class LibraryManager
{
    private $documentManager;

    public function __construct(DocumentManager $documentManager) {
        $this->documentManager = $documentManager;
    }

    public function isArtistInLibrary(String $name) {
        $artist = $this->documentManager->getRepository(Artist::class)->findBy(['name' => $name]);

        if ($artist) return $artist;
        else return NULL;
    }

    public function isAlbumInLibrary(String $name, String $albumArtist) {
        $album = $this->documentManager->getRepository(Album::class)->findBy(['name' => $name]);

        if ($album) return $album;
        else return NULL;
    }

    public function addFileToLibrary(String $path)
    {
        $tagger = new TagEditor();

        $file = new File();
        $file->setFile($path);

        $tags = $tagger->getTags($path);

        $track = new Track();

        $album = new Album();
        $album->setName($tags['tags']['album']);    

        if ($artist = $this->isArtistInLibrary($tags['tags']['albumArtist'])) {
            $albumArtist = $artist;
            var_dump($albumArtist);
        } else {
            $albumArtist = new Artist();
            $albumArtist->setName($tags['tags']['albumArtist']);
        }

        $artists = array(); 
        foreach($tags['tags']['artists'] as $artist) {
            if ($a = $this->isArtistInLibrary($artist)) {
                $artists[] = $a;
            } else {
                $a = new Artist();
                $a->setName($artist);
                $artists[] = $a;
            }
        }

        $track->setFile($file);
        $track->setTitle($tags['tags']['trackTitle']);
        $track->setArtists($artists);
        $track->setAlbum($album);
        $track->setAlbumArtist($albumArtist);
        $track->setTrackNumber($tags['tags']['trackNumber']);
        $track->setGenre($tags['tags']['genre']);
        
        $this->documentManager->persist($track);
        $this->documentManager->flush();
    }
}