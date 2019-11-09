<?php

namespace App\Service;

use getID3;
use getid3_lib;

class TagEditor
{
    private $trackTitle;
    private $artists;
    private $album;
    private $albumArtist;
    private $year;
    private $trackNumber;
    private $discNumber;
    private $tracksOnDisc;
    private $genre;

    private $filePath;
    private $fileFormat;
    private $tagFormat = "vorbiscomment";

    protected $tagReader;

    public function __construct() {
        $this->tagReader = new getID3();
    }

    private function extractTags(array $metadata) {
        $this->fileFormat = $metadata['fileformat'] ?: "";

        if (!empty($metadata['tags'])) {
			foreach ($metadata['tags'] as $tagFormat => $tags) {
                $this->trackTitle = $tags['title'] ?: "";

                if (isset($tags['artists']))
                    $this->artists = $tags['artists'];
                else if (isset($tags['artist']))
                    $this->artists = $tags['artist'];

                if (isset($tags['album']))
                    $this->album = $tags['album'];
                
                if (isset($tags['albumartist']))
                    $this->albumArtist = $tags['albumartist'];
                else if (isset($tags['artist']))
                $this->albumArtist = $tags['artist'];
                
                if (isset($tags['date']))
                    $this->year = $tags['date'];
                else if (isset($tags['year']))
                    $this->year = $tags['year'];
                
                if (isset($tags['tracknumber']))
                    $this->trackNumber = $tags['tracknumber'];
                else if (isset($tags['track_number']))
                    $this->trackNumber = $tags['track_number'];
                
                if (isset($tags['tracktotal']))
                    $this->tracksOnDisc = $tags['tracktotal'];
                else if (isset($tags['totaltracks']))
                    $this->tracksOnDisc = $tags['totaltracks'];

                if (isset($tags['part_of_a_set']))
                    $this->discNumber = $tags['part_of_a_set'];

                if (isset($tags['genre']))
                    $this->genre = $tags['genre'];
            }
        }
    }

    private function buildTagsBag() {
        $tags = array();

        $tags = [
            'fileInfo' => [
                'path' => $this->filePath,
                'format' => $this->fileFormat,
            ],
            'tags' => [
                'trackTitle' => $this->trackTitle[0],
                'artists' => $this->artists,
                'album' => $this->album[0],
                'albumArtist' => $this->albumArtist[0],
                'year' => $this->year[0],
                'trackNumber' => $this->trackNumber[0],
                'discNumber' => $this->discNumber[0],
                'tracksOnDisc' => $this->tracksOnDisc[0],
                'genre' => $this->genre[0] ?? "",
            ],
        ];

        return ($tags);
    }

    public function getTags(String $filename)
    {
        $this->filePath = $filename;
        $fileInfo = $this->tagReader->analyze($filename);
        getid3_lib::copyTagsToComments($fileInfo);

        $this->extractTags($fileInfo);
        $tags = $this->buildTagsBag();
        
        return ($tags);
    }
}