<?php

namespace App\Service;

use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Doctrine\ODM\MongoDB\Repository\UploadOptions;
use Psr\Log\LoggerInterface;

use App\Service\TagEditor;

use App\Document\File;
use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

class LibraryManager
{
    private $documentManager;
    private $gridfsRepo;

    private $logger;

    public function __construct(DocumentManager $documentManager, LoggerInterface $logger) {
        $this->documentManager = $documentManager;
        $this->logger = $logger;
    }

    public function isArtistInLibrary(String $name) {
        $artist = $this->documentManager->createQueryBuilder(Artist::class)
            ->field('name')->equals($name)
            ->getQuery()->getSingleResult();

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

    public function addArtistToLibrary(String $name) {
        $artist = new Artist();
        $artist->setName($name);
        $this->documentManager->persist($artist);

        return $artist;
    }

    public function addFileToLibrary(String $path)
    {
        $tagger = new TagEditor();
        $tags = $tagger->getTags($path);
        
        if ($tags) {
            $file = $this->documentManager->getRepository(File::class)
            ->uploadFromFile($path);

            $track = new Track();

            if ($artist = $this->isArtistInLibrary($tags['tags']['albumArtist'])) {
                $albumArtist = $artist;
            } else {
                $albumArtist = $this->addArtistToLibrary($tags['tags']['albumArtist']);
            }
    
            $artists = array(); 
            foreach($tags['tags']['artists'] as $artist) {
                if ($existingArtist = $this->isArtistInLibrary($artist)) {
                    $artists[] = $existingArtist;
                } else {
                    if ($artist == $tags['tags']['albumArtist']) {
                        $artists[] = $albumArtist;
                    } else {
                        $newArtist = $this->addArtistToLibrary($artist);
                        $artists[] = $newArtist;
                    }
                }
            }
    
            if ($albumObj = $this->isAlbumInLibrary($tags['tags']['album'], $albumArtist)) {
                $album = $albumObj;
            } else {
                $album = new Album();
                $album->setName($tags['tags']['album']);
                $album->setCover($tags['tags']['albumCover']);
                $album->setArtist($albumArtist);
                $album->setYear($tags['tags']['year'] ?? "");

                $albumArtist->getAlbums()->add($album);
                
                $this->documentManager->persist($album);
            }
    
            $track->setFile($file);
            $track->setTitle($tags['tags']['trackTitle']);
            $track->setArtists($artists);
            $track->setAlbum($album);
            $track->setAlbumArtist($albumArtist);
            $track->setTrackNumber((int) $tags['tags']['trackNumber']);
            $track->setGenre($tags['tags']['genre']);
            $track->setDuration($tags['tags']['duration']);
            $track->setFormat($tags['fileInfo']['format']);
            $track->setMimeType($tags['fileInfo']['mimetype']);
            
            $album->getTracks()->add($track);
    
            $this->documentManager->persist($track);
            $this->documentManager->flush();
        }
    }
}