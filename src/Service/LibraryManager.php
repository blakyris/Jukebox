<?php

namespace App\Service;

use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Psr\Log\LoggerInterface;

use App\Service\TagEditor;

use App\Document\File;
use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

class LibraryManager
{

    private $documentManager;

    private $logger;

    public function __construct(DocumentManager $documentManager, LoggerInterface $logger) {
        $this->documentManager = $documentManager;
        $this->logger = $logger;
    }

    public function isArtistInLibrary(String $name) {
        $artist = $this->documentManager->getRepository(Artist::class)->findOneBy(['name' => $name]);

        if ($artist) return $artist;
        else return NULL;
    }

    public function isAlbumInLibrary(String $name, Artist $albumArtist) {
        $album = $this->documentManager->createQueryBuilder(Album::class)
            ->field('name')->equals($name)
            ->field('artist')->references($albumArtist)
            ->getQuery()->getSingleResult();

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

        if ($artist = $this->isArtistInLibrary($tags['tags']['albumArtist'])) {
            $albumArtist = $artist;
        } else {
            $albumArtist = new Artist();
            $albumArtist->setName($tags['tags']['albumArtist']);
            $this->documentManager->persist($albumArtist);
        }

        $artists = array(); 
        foreach($tags['tags']['artists'] as $artist) {

            if ($a = $this->isArtistInLibrary($artist)) {
                $artists[] = $a;
            } else {
                $a = new Artist();
                $a->setName($artist);
                $this->documentManager->persist($a);
                $artists[] = $a;
            }
        }

        if ($albumObj = $this->isAlbumInLibrary($tags['tags']['album'], $albumArtist)) {
            $album = $albumObj;
        } else {
            $album = new Album();
            $album->setName($tags['tags']['album']);
            $album->setArtist($albumArtist);
            $this->documentManager->persist($album);
        }

        $track->setFile($file);
        $track->setTitle($tags['tags']['trackTitle']);
        $track->setArtists($artists);
        $track->setAlbum($album);
        $track->setAlbumArtist($albumArtist);
        $track->setTrackNumber((int) $tags['tags']['trackNumber']);
        $track->setGenre($tags['tags']['genre']);
        
        $this->documentManager->persist($track);
    }
}