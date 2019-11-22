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
        $fileId = $track->getFile()->getId();
        $len = $documentManager->getRepository(File::class)->findOneBy(['id' => $fileId])->getLength();
        
        $file = $documentManager->getRepository(File::class)
            ->openDownloadStream($fileId);
        
        $response = new StreamedResponse();
        $response->headers->set('X-Accel-Buffering', 'no');
        $response->headers->set('Transfer-Encoding', 'chunked');
        $response->headers->set('Content-Range', 'bytes 0-' . $len);
        $response->headers->set('Content-Transfer-Encoding', 'binary');
        $response->headers->set('Content-Type', $track->getMimeType());
        $response->headers->set('Content-Length', $len);
        $response->headers->set('Accept-Ranges', 'bytes');

        $response->setCallback(function () use ($file, $len) {
            $pos = 0;
            while ($pos < $len) {
                $stream = stream_get_contents($file, 128, $pos);
                echo $stream;
                ob_flush();
                flush();
                $pos = $pos + 128;
            }
        });
        
        return $response->send();
    }
}
