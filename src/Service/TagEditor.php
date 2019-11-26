<?php

namespace App\Service;

use getID3;
use getid3_lib;

class TagEditor
{
    // File Info Variables
    private $fileSize;
    private $fileFormat;
    private $mimetype;

    // Tags Variables
    private $cover;
    private $trackTitle;
    private $albumArtist;
    private $album;
    private $artists;
    private $trackNumber;
    private $discNumber;
    private $tracksOnDisc;
    private $genre;
    private $label;
    private $year;
    private $duration;

    private $tagReader;

    public function __construct() {
        $this->tagReader = new getID3();
        $this->tagReader->encoding = 'UTF-8';
    }

    public function getTags($path) {
        $rawData = $this->analyse($path);
        $this->extractData($rawData);
        $this->extractExtendedData($rawData);
        $this->cleanTags();
        return $this->buildTagsBag();
    }

    public function analyse($file) {
        $fileInfo = $this->tagReader->analyze($file);
        getid3_lib::CopyTagsToComments($fileInfo);
        return ($fileInfo);
    }

    public function extractData($data) {
        $this->fileFormat = $data['fileformat'];
        $this->mimetype = $data['mime_type'] ?? null;
        if (isset($data['comments']['picture']))
            $this->cover = $data['comments']['picture'][0]['data'];
        $raw = $data['comments_html'];
        $this->trackTitle = $raw['title'][0] ?? null;
        $this->artists = $raw['artist'] ?? null;
        if (sizeof($raw['artist']) == 1)
            $this->albumArtist = $raw['artist'][0];
        $this->album = $raw['album'][0] ?? null;
        $this->year = $raw['year'][0] ?? null;
        $this->genre = $raw['genre'][0] ?? null;
        $this->trackNumber = $raw['track_number'][0] ?? null;
        $this->label = $raw['publisher'][0] ?? null;
        $this->tracksOnDisc = $raw['totaltracks'][0] ?? null;
        $this->duration = $data['playtime_seconds'];
    }

    public function extractExtendedData($data) {
        if (!empty($data['tags'])) {
            if (isset($data['tags']['id3v1'])) {
                $this->extractId3v1($data['tags']['id3v1']);
            }
            if (isset($data['tags']['id3v2'])) {
                $this->extractId3v2($data['tags']['id3v2']);
            }
            if (isset($data['tags']['vorbiscomment'])) {
                $this->extractVorbis($data['tags']['vorbiscomment']);
            }
            if (isset($data['tags']['quicktime'])) {
                $this->extractQuickTime($data['tags']['quicktime']);
            }
        }
    }

    public function extractId3v1($tags) {
        if (isset($tags['title']))
            $this->trackTitle = $tags['title'][0];
    }

    public function extractId3v2($tags) {
        if (isset($tags['title']))
            $this->trackTitle = $tags['title'][0];

        if (isset($tags['album']))
            $this->album = $tags['album'][0];

        if (isset($tags['band']))
            $this->albumArtist = $tags['band'][0];

        if (isset($tags['artist']))
            $this->artists = $tags['artist'];

        if (isset($tags['genre']))
            $this->genre = $tags['genre'][0];
    }

    public function extractVorbis($tags) {
        if (isset($tags['title']))
            $this->trackTitle = $tags['title'][0];

        if (isset($tags['artist']))
            $this->artists = $tags['artist'];

        if (isset($tags['albumartist']))
            $this->albumArtist = $tags['albumartist'][0];

        if (isset($tags['album']))
            $this->album = $tags['album'][0];

        if (isset($tags['organization']))
            $this->label = $tags['organization'][0];
    }

    public function extractQuickTime($tags) {
        if (isset($tags['title']))
        $this->trackTitle = $tags['title'][0];

        if (isset($tags['album']))
            $this->album = $tags['album'][0];

        if (isset($tags['album_artist']))
            $this->albumArtist = $tags['album_artist'][0];

        if (isset($tags['artist']))
            $this->artists = $tags['artist'];
            
        if (isset($tags['genre']))
            $this->genre = $tags['genre'][0];
    }

    public function cleanTags() {
        if ($pos = strpos($this->trackNumber, "/") !== false) {
            $this->trackNumber = substr($this->trackNumber, 0, $pos);
        }
    }

    public function buildTagsBag() {
        $bag = [
            "fileInfo" => [
                "fileSize" => $this->fileSize,
                "format" => $this->fileFormat,
                "mimetype" => $this->mimetype,
            ],
            "tags" => [
                "trackTitle" => $this->trackTitle,
                "artists" => $this->artists,
                "albumArtist" => $this->albumArtist,
                "album" => $this->album,
                "albumCover" => $this->cover,
                "trackNumber" => $this->trackNumber,
                "tracksOnDisc" => $this->tracksOnDisc,
                "discNumber" => $this->discNumber,
                "genre" => $this->genre,
                "year" => $this->year,
                "label" => $this->label,
                "duration" => $this->duration,
            ],
        ];

        return ($bag);
    }

}