<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

use App\Document\File;
use App\Document\Artist;
use App\Document\Album;

/**
 * @MongoDB\Document
 */
class Track
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\ReferenceOne(targetDocument=File::class, storeAs="id", cascade={"persist"})
     */
    private $file;

    /**
     * @MongoDB\Field(type="string")
     */
    private $title;

    /**
     * @MongoDB\ReferenceOne(targetDocument=Artist::class, storeAs="id", cascade={"persist"})
     */
    private $albumArtist;

    /**
     * @MongoDB\ReferenceMany(targetDocument=Artist::class, storeAs="id", cascade={"persist"})
     */
    private $artists;

    /**
     * @MongoDB\ReferenceOne(targetDocument=Album::class, storeAs="id", cascade={"persist"})
     */
    private $album;

    /**
     * @MongoDB\Field(type="integer")
     */
    private $trackNumber;

    /**
     * @MongoDB\Field(type="string")
     */
    private $genre;
    
    public function __construct()
    {
        $this->artists = new ArrayCollection();
    }

    public function getId() { return $this->id; }
    public function getFile() { return $this->file; }
    public function getTitle() { return $this->title; }
    public function getAlbumArtist() { return $this->albumArtist; }
    public function getArtists() { return $this->artists; }
    public function getAlbum() { return $this->album; }
    public function getTrackNumber() { return $this->trackNumber; }
    public function getGenre() { return $this->genre; }

    public function getProperties() {
        $track = [
            "title" => $this->title,
            "albumArtist" => $this->albumArtist,
            "artists" => $this->artists,
            "album" => $this->album,
            "trackNumber" => $this->trackNumber,
            "genre" => $this->genre,
        ];

        return ($track);
    }

    public function setFile(File $file) { $this->file = $file; }
    public function setTitle(String $title) { $this->title = $title; }
    public function setAlbumArtist(Artist $artist) { $this->albumArtist = $artist; }
    public function setArtists(Array $artists) { $this->artists = $artists; }
    public function setAlbum(Album $album) { $this->album = $album; }
    public function setTrackNumber(int $number) { $this->trackNumber = $number; }
    public function setGenre(String $genre) { $this->genre = $genre; }
}