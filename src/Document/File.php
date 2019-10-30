<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

/**
 * @MongoDB\File
 */
class File
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /** 
     * @MongoDB\File\Filename
     */
    private $name;

    /**
     * @MongoDB\File\Length
     */
    private $length;

    /** 
     * @MongoDB\File\UploadDate
     */
    private $uploadDate;

    /**
     *  @MongoDB\File\ChunkSize
    */
    private $chunkSize;

    public function getId() { return $this->id; }
    public function getName(): ?string { return $this->name; }
    public function getUploadDate(): \DateTimeInterface { return $this->uploadDate; }
    public function getLength() { return $this->length; }
    public function getChunkSize() : ?int { return $this->chunkSize; }
}