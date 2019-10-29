<?php

namespace App\Service;

use Symfony\Component\Finder\Finder;

class FileManager
{
    /**
     * This function creates an array of absolute path of each audio files in the given directory.
     *
     * @param String $path
     * @return Array
     */
    public function scan(String $path)
    {
        $files = array();
        $finder = new Finder();
        $finder->files()->in($path)->name([
            '*.mp3', '*.m4a', '*.flac'
        ]);
        
        if ($finder->hasResults()) {
            foreach ($finder as $file) {
                $files[] = $file->getRealPath();
            }
            return ($files);
        } else return (NULL);
    }
}