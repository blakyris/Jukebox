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
     * @MongoDB\ReferenceOne(targetDocument=File::class, cascade={"persist"})
     */
    private $file;

    /**
     * @MongoDB\Field(type="string")
     */
    private $title;

    /**
     * @MongoDB\ReferenceOne(targetDocument=Artist::class, cascade={"persist"})
     */
    private $albumArtist;

    /**
     * @MongoDB\ReferenceMany(targetDocument=Artist::class, cascade={"persist"})
     */
    private $artists;

    /**
     * @MongoDB\ReferenceOne(targetDocument=Album::class, cascade={"persist"})
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

    /**
     * @MongoDB\Field(type="float")
     */
    private $duration;

    /** 
     * @MongoDB\Field(type="string")
     */
    private $format;
    
    /** 
     * @MongoDB\Field(type="string")
     */
    private $mimetype;

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
    public function getFormat() { return $this->format; }
    public function getDuration() { return $this->duration; }
    public function getMimeType() { return $this->mimetype; }

    public function getProperties() {
        $track = [
            'id' => $this->id,
            'title' => $this->title,
            'albumArtist' => $this->albumArtist->getName(),
            'artists' => $this->artists,
            'album' => $this->album->getName(),
            'trackNumber' => $this->trackNumber,
            'genre' => $this->genre,
            'duration' => $this->duration,
            'format' => $this->format,
            'mimetype' => $this->mimetype,
        ];

        return ($track);
    }

    public function setFile(File $file) { $this->file = $file; }
    public function setTitle(String $title) { $this->title = $title; }
    public function setAlbumArtist(Artist $artist) { $this->albumArtist = $artist; }
    public function setArtists(Array $artists) { $this->artists = $artists; }
    public function setAlbum(Album $album) { $this->album = $album; }
    public function setTrackNumber(int $number) { $this->trackNumber = $number; }
    public function setGenre($genre) { $this->genre = $genre; }
    public function setFormat(String $format) { $this->format = $format; }
    public function setDuration(float $duration) { $this->duration = $duration; }
    public function setMimeType($type) { $this->mimetype = $type; }
}