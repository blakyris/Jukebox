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
     * @MongoDB\ReferenceOne(targetDocument=Album::class, storeAs="id", cascade={"persist"})
     */
    private $artist;

    /**
     * @MongoDB\ReferenceMany(targetDocument=Track::class, storeAs="id", cascade={"persist"})
     */
    private $tracks;

    /**
     * @MongoDB\Field(type="integer")
     */
    private $year;

    public function __construct()
    {
        $this->tracks = new ArrayCollection();
    }

    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getArtist() { return $this->artist; }
    public function getTracks() { return $this->tracks; }
    public function getYear() { return $this->year; }

    public function setName(String $name) { $this->name = $name; }
    public function setArtist(String $artist) { $this->artist = $artist; }
    public function setYear(int $year) { $this->year = $year; }
}