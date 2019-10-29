<?php

namespace App\Controller\API\FileManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Service\TagEditor;
use App\Service\FileManager;

use App\Document\Artist;
use App\Document\Album;
use App\Document\Track;

class UploadController
{
    /**
     * @Route("/api/upload/tracks", methods={"POST"})
     */
    public function getAll(DocumentManager $dm, Request $request, FileManager $fileManager, TagEditor $tagEditor)
    {
        $file = $request->files->get('file');
        if ($file) {
            $filename = $file->getPath() . "/" . $file->getFileName();
            $tags = $tagEditor->getTags($filename);
            return new JsonResponse($tags['tags']);
        } else {
            return new JsonResponse(['Error' => "An error occured while uploading files. Please try again."]);
        }
    }
}
