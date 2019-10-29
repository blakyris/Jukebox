<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

use App\Document\Album;

/**
 * @MongoDB\Document
 */
class Artist
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
     * @MongoDB\ReferenceMany(targetDocument=Album::class, cascade={"persist"})
     */
    private $albums;

    public function __construct()
    {
        $this->albums = new ArrayCollection();
    }

    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getAlbums() { return $this->albums; }

    public function getProperties() {
        $albumsArray = array();

        foreach ($this->albums as $album)
            $albumsArray[] = $album->getName();

        $artist = [
            'name' => $this->name,
            'alums' => $albumsArray
        ];

        return $artist;
    }

    public function setName(String $name) { $this->name = $name; }
}