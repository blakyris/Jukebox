<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

use App\Document\Artist;
use App\Document\Track;

/**
 * @MongoDB\Document
 */
class Album
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\Field(type="string")
     */
    private $name;

    /**
     * @MongoDB\Field(type="bin")
     */
    private $cover;

    /**
     * @MongoDB\ReferenceOne(targetDocument=Artist::class, cascade={"persist"})
     */
    private $artist;

    /**
     * @MongoDB\ReferenceMany(targetDocument=Track::class, cascade={"persist"})
     */
    private $tracks;

    /**
     * @MongoDB\Field(type="string")
     */
    private $year;

    public function __construct()
    {
        $this->tracks = new ArrayCollection();
    }

    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getCover() { return $this->cover; }
    public function getArtist() { return $this->artist; }
    public function getTracks() { return $this->tracks; }
    public function getYear() { return $this->year; }

    public function getTracksProperties() {
        $tracklist = array();
        foreach ($this->tracks as $track) {
            $tracklist[] = $track->getProperties();
        }

        return $tracklist;
    }

    public function getProperties() {
        $album = [
            'id' => $this->id,
            'name' => $this->name,
            'artist' => $this->artist->getName(),
            'tracks' => $this->getTracksProperties(),
        ];

        return $album;
    }

    public function setName(String $name) { $this->name = $name; }
    public function setCover($cover) { $this->cover = $cover; }
    public function setArtist(Artist $artist) { $this->artist = $artist; }
    public function setYear(String $year) { $this->year = $year; }
}