<?php

namespace App\Controller\API\Player;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

use App\Document\Track;
use App\Document\Artist;
use App\Document\Album;
use App\Document\File;

class StreamController extends AbstractController
{
    /**
     * @Route("/api/stream/{id}", methods={"GET"})
     */
    public function streamTrack(DocumentManager $documentManager, $id)
    {
        $track = $documentManager->getRepository(Track::class)->findOneBy(['id' => $id]);
        $file = $documentManager->getRepository(File::class)
            ->openDownloadStream($track->getFile()->getId());
        
        $response = new StreamedResponse();
        $response->headers->set('X-Accel-Buffering', 'no');

        $response->setCallback(function () use ($file) {
            $stream = stream_get_contents($file);
            echo $stream;
            ob_flush();
            flush();
        });
        
        return $response->send();
    }
}
