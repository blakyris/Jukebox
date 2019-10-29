<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Common\Collections\ArrayCollection;

use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;

/**
 * @MongoDB\Document
 */
class File
{
    /**
     * @MongoDB\Id
     */
    private $id;

    /**
     * @MongoDB\File
     */
    private $file;

    /** 
     * @MongoDB\Field(type="date")
     */
    private $uploadDate;

    /**
     * @MongoDB\Field(type="string")
     */
    private $mimeType;

    /**
     *  @MongoDB\Field(type="int") 
    */
    private $chunkSize;
    
    public function getId() { return $this->id; }
    public function getFile() { return $this->file; }
    public function getUploadDate() { return $this->uploadDate; }
    public function getMimeType() { return $this->mimeType; }
    public function getChunkSize() { return $this->chunkSize; }
   
    public function setFile($file) { $this->file = $file; }
    public function setMimeType(String $type) { $this->mimeType = $type; }
}