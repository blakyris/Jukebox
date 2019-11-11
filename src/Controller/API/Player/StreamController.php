<?php

namespace App\Controller\API\Player;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;

use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;
use App\Document\File;

class StreamController
{
    /**
     * @Route("/api/stream/track/{id}", methods={"GET"})
     */
    public function searchArtist(DocumentManager $documentManager, $id)
    {
        $response = new StreamedResponse();
        $track = $documentManager->getRepository(Track::class)->findOneBy(['id' => $id]);

        $stream = $documentManager->getRepository(File::class)
            ->openDownloadStream($track->getFile()->getId());
        
        $response->setCallback(function () use ($stream) {
            $contents = stream_get_contents($stream);
            echo $contents;
            flush();
        });
        
        return $response->send();
    }
}
